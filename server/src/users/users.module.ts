import { Module } from '@nestjs/common';
import { UsersResolver } from './resolvers/users.resolver';

@Module({
  providers: [UsersResolver],
})
export class UsersModule {}
