import { Body, Controller, Get, Inject, Param, Post } from "@nestjs/common";
import { NovelService } from "./novel.service";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import SWAGGER_TAGS from "src/constant/swagger/tags";
import { UserId } from "src/decorator/auth.decorator";
import { CreateNovelDto } from "./dto/createNovel.dto";
import { PublicApi } from "src/decorator/public.decorator";
import { QueryUserNovelParams } from "./dto/queryNovel.dto";

@ApiTags(SWAGGER_TAGS.NOVEL)
@Controller('novel')
@ApiBearerAuth()
export class NovelController {
    @Inject()
    private readonly novelService: NovelService

    /**
     * 创建书本
     * @param userId 
     * @param data 
     */
    @ApiOperation({ summary: '创建书本' })
    
    @Post()
    createNovel(@UserId() userId: number, @Body() data: CreateNovelDto) {
        return this.novelService.createBook(userId, data);
    }
    /**
     * 查询当前用户的所有书本
     * @param userId 
     * @returns 
     */
    @ApiOperation({ summary: '查询当前用户的所有书本' })
    @Get('list')
    getNovelList(@UserId() userId: number) {
        return this.novelService.queryUserAllNovel(userId)
    }
    /**
     * 查询某个用户的所有书本
     * @param params 
     * @returns 
     */
    @ApiOperation({ summary: '查询某个用户的所有书本' })
    @PublicApi()
    @Get('list/:userId')
    getNovelListWithUser(@Param() params: QueryUserNovelParams) {
        return this.novelService.queryUserAllNovel(params.userId)
    }
}