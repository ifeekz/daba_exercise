import { IsEmail, IsString } from 'class-validator';
import { InputType, Field } from 'type-graphql';
import { User } from '@typedefs/users.type';

@InputType()
export class SignupUserDto implements Partial<User> {
  @Field()
  @IsString()
  name: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  password: string;
}
