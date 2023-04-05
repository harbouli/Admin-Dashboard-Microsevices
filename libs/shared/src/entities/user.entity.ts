import { Exclude } from 'class-transformer';
import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { ROLES } from '../utils/constants';

@Entity('user')
export class UserEntity {
  @ObjectIdColumn()
  _id: ObjectID;
  @Column({ name: 'email' })
  email: string;
  @Column({ name: 'role', type: 'enum', enum: ROLES })
  adminType: ROLES;
  @Column({ name: 'username' })
  username: string;
  @Column({ name: 'password' })
  password: string;
  @Column({ name: 'phone_number' })
  phonenumber: string;
  @Column({ name: 'firstname' })
  firstname: string;
  @Column({ name: 'lastname' })
  lastname: string;
  @Column({ nullable: true, name: 'refresh_token' })
  @Exclude()
  rfToken?: string;
  @Column({ nullable: true })
  @Exclude()
  token: string;
}
