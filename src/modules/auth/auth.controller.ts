import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UserLoginDto } from './dto/request/user.login-request.dto';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { LogoutGuard } from '../../common/guards/logout.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Login user' })
  @Post('login')
  async login(@Body() data: UserLoginDto) {
    return await this.authService.login(data);
  }

  @UseGuards(AuthGuard(), LogoutGuard)
  @ApiOperation({ summary: 'Logout user' })
  @Post('logout')
  public async logout(@Body() data) {
    return await this.authService.logout();
  }
}
