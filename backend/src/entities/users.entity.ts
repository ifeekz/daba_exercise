import { model, Schema, Document } from 'mongoose';
import { User } from '@interfaces/users.interface';

const userSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    default: null,
  },
  phone: {
    type: String,
    unique: true,
    default: null,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    default: null,
  },
});

const UserEntity = model<User & Document>('User', userSchema);

export default UserEntity;
