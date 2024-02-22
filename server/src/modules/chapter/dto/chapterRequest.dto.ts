import { Type } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

export class allChapterParamsDto {
    /** 书本id */
    @Type(() => Number)
    @IsNumber()
    novelId: number
}

export class createChapterDto {
    /** 书本id */
    @IsNumber()
    novelId: number;

    /** 章节名称 */
    @IsString()
    title: string;

    /** 内容 */
    @IsString()
    content: string;

    /** 回合 */
    @IsNumber()
    round: number;
}