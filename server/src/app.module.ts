import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    // External modules
    GraphQLModule.forRoot({ autoSchemaFile: join(process.cwd(), 'src/graphql/schema.graphql') }),
    TypeOrmModule.forRoot({ autoLoadEntities: true }),

    // Internal modules
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
