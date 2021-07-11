import { Injectable } from '@nestjs/common';
import { verify } from 'argon2';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}
  // TODO: Fix type of returned Promise
  async validateUser(username: string, password: string): Promise<any> {
    const user: User = await this.usersService.findByUsername(username);

    if (user && (await verify(user.password, password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...rest } = user;

      return rest;
    }

    return null;
  }
}
