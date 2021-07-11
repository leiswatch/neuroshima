import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersResolver } from 'src/users/resolvers/users.resolver';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    // Services
    UsersService,

    // Resolvers
    UsersResolver,
  ],
  exports: [UsersService],
})
export class UsersModule {}
