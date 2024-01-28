import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class FindUserParamsDto {
    @ApiProperty({ description: '用户Id', required: true, default: 1 })
    @Type(() => Number)
    @IsNumber()
    userId: number;
}