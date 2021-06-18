import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    // External modules
    GraphQLModule.forRoot({ autoSchemaFile: true }),
    TypeOrmModule.forRoot({ autoLoadEntities: true }),

    // Internal modules
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
