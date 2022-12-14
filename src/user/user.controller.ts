import {
  Controller,
  Get,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { Users } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  @Get('me')
  getMe(@GetUser() user: Users) {
    return user;
  }

  //   @Patch()
  //   editUser() {}
}
