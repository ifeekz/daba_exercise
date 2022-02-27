import { Field, ObjectType } from 'type-graphql';
import { Column } from 'typeorm';

@ObjectType()
export class User {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  bio?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  phone?: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  photo?: string;
}
