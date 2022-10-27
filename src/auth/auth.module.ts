import { Module } from '@nestjs/common';
import { AuthCotroller } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthCotroller],
  providers: [AuthService],
})
export class AuthModule {}
