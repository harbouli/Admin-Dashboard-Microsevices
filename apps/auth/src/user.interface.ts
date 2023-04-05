import { UserEntity } from '@app/shared';
import { CreateUserType, JwtPayload, Tokens } from './types/user.type';

export interface IAuthService {
  createUser(createUserParam: CreateUserType): Promise<Tokens>;
  //   findUser(
  //     findUserParams: FindeAdminParams,
  //     options?: FindUserOptions,
  //   ): Promise<Admin>;
  //   initApp(): Promise<boolean>;
  getTokens({ sub, username }: JwtPayload): Promise<Tokens>;
  //   findAllAdmins(
  //     pageParams: PageQuery,
  //     filterQuery: FilterQuery,
  //   ): Promise<PageResponse>;
  //   updateUser(id: number, update: Partial<UserEntity>);
  //   isValidToken(token: JwtPayload): Promise<boolean>;
  //   deleteAdmin(id: number): Promise<any>;
  //   verifyToken(jwt: { token: string }): Promise<VerifyTokenResponse>;
  //   logout(id: number): Promise<any>;
}
