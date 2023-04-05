import { REPOSITORIES } from '@app/shared';
import { UserRepositoryInterface } from '@app/shared/interfaces/users.repository.interface';
import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import * as argon from 'argon2';
import { IAuthService } from './user.interface';
import { CreateUserType, JwtPayload, Tokens } from './types/user.type';
import { hashPassword } from '@app/shared/utils/helper';
import { JwtService } from '@nestjs/jwt';
import { ObjectID } from 'typeorm';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(REPOSITORIES.USER)
    private readonly usersRepository: UserRepositoryInterface,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(createUserParam: CreateUserType): Promise<Tokens> {
    // Check If User id already Exist
    const existingUser = await this.usersRepository.findByCondition({
      where: {
        email: createUserParam.email,
        username: createUserParam.username,
      },
    });
    if (existingUser)
      throw new HttpException('User Is Already Exists', HttpStatus.CONFLICT);

    // Hach Password
    const hashedPassword = await hashPassword(createUserParam.password);

    const lowerCase = createUserParam.email.toLocaleLowerCase();
    // Create User
    const newUser = this.usersRepository.create({
      ...createUserParam,
      email: lowerCase,
      password: hashedPassword,
    });
    Logger.log('Creating User ...');
    const user = await this.usersRepository.save(newUser);

    const token = await this.getTokens({
      sub: user._id,
      username: user.email,
      role: user.adminType,
    });
    await this.updateTokenHash(user._id, token.access_token);
    return token;
  }

  // Generate  Token
  async getTokens({ sub, username, role }: JwtPayload): Promise<Tokens> {
    const jwtPayload = {
      sub,
      username,
      role,
    };

    const [at] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '30d',
      }),
    ]);

    return {
      access_token: at,
    };
  }

  // Update Token
  async updateTokenHash(_id: ObjectID, at: string): Promise<void> {
    const hashToken = await argon.hash(at);
    this.usersRepository.update(_id, { token: hashToken });
  }
}
