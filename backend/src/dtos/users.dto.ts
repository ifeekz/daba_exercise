import { IsEmail, IsOptional, IsString } from 'class-validator';
import { InputType, Field } from 'type-graphql';
import { User } from '@typedefs/users.type';

@InputType()
export class CreateUserDto implements Partial<User> {
  @Field()
  @IsString()
  name: string;

  @Field()
  @IsOptional()
  bio: string;

  @Field()
  @IsOptional()
  phone: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  password: string;

  @Field()
  @IsOptional()
  photo: string;
}
