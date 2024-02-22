import { Controller, Get, Inject, Param, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import SWAGGER_TAGS from "src/constant/swagger/tags";
import { allChapterParamsDto } from "./dto/chapterRequest.dto";
import { ChapterService } from "./chapter.service";

@ApiTags(SWAGGER_TAGS.CHAPTER)
@Controller('chapter')
@ApiBearerAuth()
export class ChapterController {
    @Inject()
    private readonly chapterService: ChapterService;
    /**
     * 获取书本的所有章节
     */
    @ApiOperation({ summary: '获取书本的所有章节' })
    @Get(':novelId')
    getAllChaptersOfNovel(@Param() param: allChapterParamsDto ) {
        return this.chapterService.getAllChapterOfNovel(param.novelId);
    }

    createChapter() {}
}