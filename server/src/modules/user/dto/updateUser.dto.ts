import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
    @ApiProperty({ description: '昵称', required: false, default: '修改后的昵称'  })
    @IsOptional()
    @IsString()
    nickname?: string;
}