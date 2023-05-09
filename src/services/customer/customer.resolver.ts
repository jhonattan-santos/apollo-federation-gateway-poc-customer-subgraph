import { NotFoundException } from '@nestjs/common';
import {
  Args,
  Parent,
  Query,
  ResolveField,
  ResolveReference,
  Resolver,
} from '@nestjs/graphql';
import { CustomerService } from './customer.service';
import { Customer } from './entities/customer.entity';

@Resolver((of) => Customer)
export class CustomerResolver {
  constructor(private readonly customerService: CustomerService) {}

  @Query((returns) => [Customer])
  async customer(@Args('accountId') accountId: string): Promise<Customer[]> {
    const customer = await this.customerService.findCustomerByAccountId(
      accountId,
    );
    if (!customer) {
      throw new NotFoundException(accountId);
    }
    return customer;
  }

  @Query((returns) => [Customer])
  async customers(): Promise<Customer[]> {
    return await this.customerService.findAllCustomer();
  }

  @ResolveReference()
  async resolveReference(reference: { __typename: string; accountId: string }) {
    const customer = await this.customerService.findCustomerByAccountId(
      reference.accountId,
    );
    if (!customer) {
      throw new NotFoundException(reference.accountId);
    }
    return customer[0];
  }

  @ResolveField('pendingDocuments')
  pendingDocuments(@Parent() customer: Customer) {
    return { __typename: 'PendingDocument', customerId: customer.id };
  }

  @ResolveField('offers')
  offers(@Parent() customer: Customer) {
    return { __typename: 'Offers', customerId: customer.id };
  }
}
