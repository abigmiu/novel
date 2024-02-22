import { ApiOperation, ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsNumber, IsNumberString, IsOptional } from "class-validator";

export class QueryUserNovelParams {
    @Type(() => Number)
    @IsNumber()
    userId: number;
}

export class UserNovelPageQueryDto {
    /**
     * 最后一个书本的id
     */
    @Type(() => Number)
    @IsNumber()
    @IsOptional()
    @ApiProperty({ required: false })
    lastId?: number;

    /** 
     * @requires false
     */
    @Type(() => Number)
    @IsNumber()
    @IsOptional()
    @ApiProperty({ required: false })
    pageSize: number = 20;

    /**
     * 要查找的用户ID
     */
    @Type(() => Number)
    @IsNumber()
    userId: number;
}