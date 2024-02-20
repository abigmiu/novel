import { Optional } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, IsUrl, Length } from "class-validator";

/**
 * 创建书本dto
 */
export class CreateNovelDto {
    /** 
     * 书本名称
     */
    @ApiProperty({ default: '剑来' })
    @Length(1, 16, {
        message: '书本名称长度需要1-16个字符'
    })
    title: string;
    
    /**
     * 书本封面图
     * @requires false
     */
    @ApiProperty({ default: 'http://1.com'  })
    @IsOptional()
    @IsUrl({}, {
        message: '书本封面图地址错误'
    })
    cover?: string;
}