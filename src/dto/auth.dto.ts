/* eslint-disable prettier/prettier */
import {
  IsString,
  IsEmail,
  IsNotEmpty,
} from 'class-validator';

/* eslint-disable prettier/prettier */
export class AuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
