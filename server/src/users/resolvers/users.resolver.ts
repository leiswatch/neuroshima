import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from '../entities/user.entity';
import CreateUserInput from '../dto/CreateUserInput';
import UpdateUserInput from '../dto/UpdateUserInput';
import { UsersService } from '../users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => [User])
  async getUsers(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @Query(() => User)
  async getUser(@Args('id') id: number): Promise<User> {
    return await this.usersService.findOne(id);
  }

  @Mutation(() => User)
  async registerUser(@Args('createUserInput') createUserInput: CreateUserInput): Promise<User> {
    return await this.usersService.create(createUserInput);
  }

  @Mutation(() => User)
  async updateUser(
    @Args('id') id: number,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    return await this.usersService.update(id, updateUserInput);
  }

  @Mutation(() => User)
  async removeUser(@Args('id') id: number) {
    return await this.usersService.remove(id);
  }
}
