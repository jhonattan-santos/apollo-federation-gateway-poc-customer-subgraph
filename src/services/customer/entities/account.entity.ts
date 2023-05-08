import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Employee } from './employee.entity';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "id")')
export class Account {
  @Field((type) => ID, { nullable: true })
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
  employeeId: string;

  @Field((type) => String, { nullable: true })
  @Directive('@external')
  balance: string;

  @Field((type) => Employee, { nullable: true })
  @Directive('@external')
  employee: Employee;

  @Field((type) => String, { nullable: true })
  @Directive('@external')
  creationDate: Date;
}
