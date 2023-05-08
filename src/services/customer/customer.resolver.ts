import { NotFoundException } from '@nestjs/common';
import {
  Args,
  Parent,
  Query,
  ResolveField,
  ResolveReference,
  Resolver,
} from '@nestjs/graphql';
import { Account } from './entities/account.entity';
import { CustomerService } from './customer.service';
import { Customer } from './entities/customer.entity';

@Resolver((of) => Customer)
export class CustomerResolver {
  constructor(private readonly customerService: CustomerService) {}

  @Query((returns) => [Customer])
  async customer(@Args('accountId') accountId: string): Promise<Customer[]> {
    const customer = await this.customerService.findCustomerByAccountId(accountId);
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
    const employee = await this.customerService.findCustomerByAccountId(
      reference.accountId,
    );
    if (!employee) {
      throw new NotFoundException(reference.accountId);
    }
    return employee[0];
  }
}
