import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "id")')
export class Employee {
  @Field((type) => ID)
  @Directive('@external')
  id: string;

  @Field((type) => String, { nullable: true })
  @Directive('@external')
  name: string;

  @Field((type) => String, { nullable: true })
  @Directive('@external')
  agency: string;

  @Field((type) => String, { nullable: true })
  @Directive('@external')
  email: string;

  @Field((type) => [String], { nullable: true })
  @Directive('@external')
  role: string[];

  @Field((type) => String, { nullable: true })
  @Directive('@external')
  creationDate: Date;
}
