import {ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class LoginDto {
    @ApiProperty({ description: '邮箱', default: 'aaa@aaa.com' })
    @IsEmail({}, {
        message: '邮箱格式不正确',
    })
    email: string;

    @ApiProperty({ description: '密码', default: '密码' })
    password: string;
}