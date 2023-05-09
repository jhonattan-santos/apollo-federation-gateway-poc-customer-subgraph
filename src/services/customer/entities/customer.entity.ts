import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { PendingDocument } from './pending-document.entity';
import { Offers } from './offers.entity';

@ObjectType()
@Directive('@key(fields: "accountId")')
export class Customer {
  @Field((type) => ID, { nullable: true })
  id: string;

  @Field((type) => String, { nullable: true })
  name: string;

  @Field((type) => ID, { nullable: true })
  accountId: string;

  @Field((type) => PendingDocument, { nullable: true })
  pendingDocuments: PendingDocument;

  @Field((type) => Offers, { nullable: true })
  offers: Offers;

  @Field((type) => String, { nullable: true })
  email: string;

  @Field((type) => String, { nullable: true })
  jobPosition: string;

  @Field((type) => String, { nullable: true })
  salary: string;

  @Field((type) => [FamilyMember], { nullable: true })
  familyMembers: FamilyMember[];

  @Field((type) => String, { nullable: true })
  birthDate: Date;

  @Field((type) => String, { nullable: true })
  creationDate: Date;
}

@ObjectType()
@Directive('@key(fields: "id")')
export class FamilyMember {
  @Field((type) => ID)
  id: string;

  @Field((type) => String, { nullable: true })
  name: string;

  @Field((type) => String, { nullable: true })
  type: string;
}
