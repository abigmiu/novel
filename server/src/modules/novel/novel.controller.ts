import { Body, Controller, Inject, Post } from "@nestjs/common";
import { NovelService } from "./novel.service";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import SWAGGER_TAGS from "src/constant/swagger/tags";
import { UserId } from "src/decorator/auth.decorator";
import { CreateNovelDto } from "./dto/createNovel.dto";

@ApiTags(SWAGGER_TAGS.NOVEL)
@Controller('novel')
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

    }

}