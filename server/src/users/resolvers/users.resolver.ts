import { Resolver, Query } from '@nestjs/graphql';
import { User } from '../models/user';

@Resolver(() => User)
export class UsersResolver {
  @Query(() => String)
  getHello(): string {
    return 'Hello world';
  }
}
