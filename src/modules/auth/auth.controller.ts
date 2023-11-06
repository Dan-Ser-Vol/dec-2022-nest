import { Body, Controller, Post } from '@nestjs/common';
import { UserLoginDto } from './dto/request/user.login-request.dto';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Login user' })
  @Post('login')
  async login(@Body() data: UserLoginDto) {
    return await this.authService.login(data);
  }
}
