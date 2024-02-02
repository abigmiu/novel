import { Optional } from "@nestjs/common";
import { IsString, IsUrl, Length } from "class-validator";

/**
 * 创建书本dto
 */
export class CreateNovelDto {
    /** 
     * 书本名称
     */
    @Length(1, 16, {
        message: '书本名称长度需要1-16个字符'
    })
    title: string;
    
    /**
     * 书本封面图
     * @requires false
     */
    @Optional()
    @IsUrl({}, {
        message: '书本封面图不能为空'
    })
    cover?: string;
}