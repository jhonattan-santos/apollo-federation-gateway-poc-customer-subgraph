import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { Customer } from './entities/customer.entity';
import { ResolveReference } from '@nestjs/graphql';

@Injectable()
export class CustomerService {
  private readonly logger = new Logger(CustomerService.name);

  constructor(private readonly httpService: HttpService) {}

  baseURL = 'http://localhost:4001';

  async findCustomerByAccountId(id: string): Promise<Customer[]> {
    const { data } = await firstValueFrom(
      this.httpService.get<Customer[]>(`${this.baseURL}/customer?accountId=${id}`).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw 'An error happened!';
        }),
      ),
    );
    return data;
  }

  async findAllCustomer(): Promise<Customer[]> {
    const { data } = await firstValueFrom(
      this.httpService.get<Customer[]>(`${this.baseURL}/customer`).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw 'An error happened!';
        }),
      ),
    );
    return data;
  }

  @ResolveReference()
  async resolveReference(reference: { __typename: string; accountId: string }) {
    const { data } = await firstValueFrom(
      this.httpService.get<Customer[]>(`${this.baseURL}/customer?accountId=${reference.accountId}`).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw 'An error happened!';
        }),
      ),
    );
    return data;
  }
}
