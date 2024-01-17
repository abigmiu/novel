import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length, Validate } from "class-validator";

export class CreateUserDto {
    @IsString()
    @ApiProperty({ description: '邮箱, 最长50个字符' })
    email: string;

    @IsString()
    @ApiProperty({ description: '昵称，最多25个字' })
    nickname: string;

    @IsString()
    @Length(6, 12, {
        message: '密码需要6 - 12 位字符'
    })
    @ApiProperty({ description: '密码, 6 - 12位' })
    password: string;

    @IsString()
    @ApiProperty({ description: '头像，255字限制' })
    avatar: string;
}