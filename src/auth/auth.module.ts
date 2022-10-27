import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthCotroller } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  // imports: [PrismaModule],
  controllers: [AuthCotroller],
  providers: [AuthService],
})
export class AuthModule {}
