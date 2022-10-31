/* eslint-disable prettier/prettier */
import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { AuthDto } from 'src/dto';
import { PrismaService } from '../prisma/prisma.service';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable({})
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async signup(dto: AuthDto) {
    const hash = await argon.hash(dto.password);
    try {
      const user =
        await this.prismaService.users.create({
          data: {
            email: dto.email,
            hash,
          },
          // to show only the fields marked with true
          // select: {
          //     id: true,
          //     email: true,
          //     createdAt: true,
          // },
        });

        return this.signToken(user.id, user.email);
    } catch (error) {
      if (
        error instanceof
        PrismaClientKnownRequestError
      ) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(
            'Credentials taken',
          );
        }
        throw error;
      }
    }
  }

  async signin(dto: AuthDto) {
    // find the user
    const user = await this.prismaService.users.findUnique({
        where: {email: dto.email,}
    });

    // is user doen't exis throw an exception
    if (!user) throw new ForbiddenException(
        'Credentials incorrect',
      );

     // compare password 
     const passMatches = await argon.verify(
        user.hash,
        dto.password
     );

     // if doesn't match - throw error
     if (!passMatches) throw new ForbiddenException(
        'Credentials incorrect',
      );

    return this.signToken(user.id, user.email);
  }

  async signToken(userId: number, email: string) {
    const payload = {
      sub: userId,
      email,
    };

    const secret = this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret,
    });

    return {
      access_token: token,
    }
  } 
}
