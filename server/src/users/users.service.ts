import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'argon2';
import CreateUserInput from 'src/users/dto/CreateUserInput';
import UpdateUserInput from 'src/users/dto/UpdateUserInput';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find({});
  }

  async findOne(id: number): Promise<User> {
    const user: User | undefined = await this.usersRepository.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    return user;
  }

  async findByUsername(username: string): Promise<User> {
    const user: User | undefined = await this.usersRepository.findOne({ where: { username } });

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    return user;
  }

  async create(userInput: CreateUserInput): Promise<User> {
    const { password, ...rest } = userInput;
    const hashedPassword: string = await hash(password);

    const user: User = this.usersRepository.create({
      password: hashedPassword,
      ...rest,
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
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
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
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return user;
  }
}
