import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    // Internal modules
    UsersModule,

    // External modules
    GraphQLModule.forRoot({ autoSchemaFile: true }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
