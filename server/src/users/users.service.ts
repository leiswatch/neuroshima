import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'argon2';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import CreateUserInput from './types/CreateUserInput';
import UpdateUserInput from './types/UpdateUserInput';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    const users: User[] = await this.usersRepository.find();

    return users;
  }

  async findOne(id: number): Promise<User> {
    const user: User = await this.usersRepository.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    return user;
  }

  async create(userInput: CreateUserInput): Promise<User> {
    const { username, email, password } = userInput;
    const hashedPassword: string = await hash(password);

    const user: User = this.usersRepository.create({
      username,
      email,
      password: hashedPassword,
    });

    await this.usersRepository.save(user);

    return user;
  }

  async update(id: number, userInput: UpdateUserInput): Promise<User> {
    const user: User = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    try {
      await this.usersRepository.update(id, {
        ...userInput,
      });

      Object.assign(user, userInput);

      return user;
    } catch (error) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number): Promise<User> {
    const user: User = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    try {
      await this.usersRepository.delete(id);
    } catch (error) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return user;
  }
}
