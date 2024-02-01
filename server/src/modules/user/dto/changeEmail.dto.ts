import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class ChangeOldEmailDto {
    /**
     * 旧邮箱
     * @example 123@abstract.com
     */
    @IsString()
    email: string;

    @ApiProperty({ description: '旧邮箱准备更换邮箱的验证码' })
    @IsString()
    code: string;
}

export class UpdateEmailDto {
    @ApiProperty({ description: '旧邮箱更换时候的 通行码 ' })
    @IsString()
    verifyCode: string;

    @ApiProperty({ description: '新邮箱' })
    @IsEmail()
    email: string;

    @ApiProperty({ description: '新邮箱验证码' })
    @IsString()
    code: string;
}