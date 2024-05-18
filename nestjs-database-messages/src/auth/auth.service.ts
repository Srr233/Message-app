import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { UserModel } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { genSalt, hash, compare } from 'bcryptjs';
import { randomUUID } from 'crypto';
import { USER_NOT_FOUND, WRONG_PASSWORD } from './auth.constants';
import { JwtService } from '@nestjs/jwt';
import { PayloadLogin } from './interfaces/payloadLogin';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(dto: AuthDto) {
    const salt = await genSalt(10);
    const newUser: UserModel = {
      _id: randomUUID(),
      email: dto.login,
      passwordHash: await hash(dto.password, salt),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return this.userRepository.save(newUser);
  }
  async findUser(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  async validateUser(email: string, password: string): Promise<PayloadLogin> {
    const user = await this.findUser(email);
    if (!user) throw new HttpException(USER_NOT_FOUND, HttpStatus.UNAUTHORIZED);
    const isCorrectPassword = await compare(password, user.passwordHash);
    if (!isCorrectPassword)
      throw new HttpException(WRONG_PASSWORD, HttpStatus.UNAUTHORIZED);
    return { email: user.email };
  }

  async login(payload: PayloadLogin) {
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
