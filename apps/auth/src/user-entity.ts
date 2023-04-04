import { Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
  @ObjectIdColumn()
  _id: ObjectID;
}
