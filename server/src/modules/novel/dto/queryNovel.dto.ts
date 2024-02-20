import { Type } from "class-transformer";
import { IsNumber } from "class-validator";

export class QueryUserNovelParams {
    @Type(() => Number)
    @IsNumber()
    userId: number;
}