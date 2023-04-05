import { ObjectID } from 'typeorm';

export type CreateUserType = {
  email: string;
  password: string;
  lastName: string;
  firstName: string;
  phone_number?: string;
  username: string;
};
export type Tokens = { access_token: string };
export type JwtPayload = {
  username: string;
  sub: ObjectID;
  role: string;
};
