import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "customerId")')
export class Offers {
  @Field((type) => ID, { nullable: true })
  @Directive('@external')
  id: string;

  @Field((type) => String, { nullable: true })
  @Directive('@external')
  name: string;

  @Field((type) => ID, { nullable: true })
  @Directive('@external')
  customerId: string;

  @Field((type) => String, { nullable: true })
  @Directive('@external')
  creationDate: Date;
}
