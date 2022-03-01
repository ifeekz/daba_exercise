import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class Token {
  @Field()
  expiresIn: number;

  @Field()
  token: string;
}
