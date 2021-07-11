import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    // External modules
    GraphQLModule.forRoot({ autoSchemaFile: join(process.cwd(), 'src/graphql/schema.graphql') }),
    TypeOrmModule.forRoot({ autoLoadEntities: true }),

    // Internal modules
    UsersModule,

    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
