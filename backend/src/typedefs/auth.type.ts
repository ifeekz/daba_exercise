import { Field, ObjectType } from 'type-graphql';
import { User } from './users.type';
import { Token } from './token.type';

@ObjectType()
export class Auth {
  @Field()
  user: User;

  @Field()
  token: Token;
}
