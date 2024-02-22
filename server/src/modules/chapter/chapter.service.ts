import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EXCEPTION_QUERY_FAIL } from "src/constant/exception/common";
import { ChapterEntity } from "src/entities/chapter.entity";
import { NovelEntity } from "src/entities/novel.entity";
import { Repository } from "typeorm";

@Injectable()
export class ChapterService {
    @InjectRepository(ChapterEntity)
    private readonly chapterRepo: Repository<ChapterEntity>

    /**
     * 获取某本小说的所有章节
     * @param novelId 
     * @returns 
     */
    async getAllChapterOfNovel(novelId: number) {
        
        const novel = new NovelEntity();
        novel.id = novelId;
        try {
            const foundData = await this.chapterRepo.find({
                where: {
                    novel,
                }
            })
            return foundData;
        } catch {
            throw new BadRequestException(EXCEPTION_QUERY_FAIL)
        }
    }
}