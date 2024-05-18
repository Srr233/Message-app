import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { USER_EXISTS } from './auth.constants';
import { PayloadLogin } from './interfaces/payloadLogin';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: AuthDto) {
    const oldUser = await this.authService.findUser(dto.login);
    if (oldUser) throw new HttpException(USER_EXISTS, HttpStatus.BAD_REQUEST);
    return await this.authService.createUser(dto);
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() { login, password }: AuthDto) {
    const payload: PayloadLogin = await this.authService.validateUser(
      login,
      password,
    );
    return this.authService.login(payload);
  }
}
