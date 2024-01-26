import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsNumberString, IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateUserDto {
    @ApiProperty({ description: '昵称', required: false, default: '修改后的昵称'  })
    @IsOptional()
    @IsString()
    nickname?: string;

    @ApiProperty({ description: '头像', required: false, default: 'http://avatar.com' })
    @IsOptional()
    @IsUrl()
    avatar?: string;
}

export class UpdateUserParamsDto {
    @ApiProperty({ description: '用户Id', required: true, default: 1 })
    @Type(() => Number)
    @IsNumber()
    id: number;
}