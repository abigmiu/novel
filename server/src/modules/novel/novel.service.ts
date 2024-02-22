import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateNovelDto } from "./dto/createNovel.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { NovelEntity } from "src/entities/novel.entity";
import { Repository } from "typeorm";
import { UserEntity } from "src/entities/user.entity";
import { EXCEPTION_QUERY_FAIL } from "src/constant/exception/common";
import { UserNovelPageQueryDto } from "./dto/queryNovel.dto";
import { NovelItemResponseDto } from "./dto/novelResponse.dto";
import { EXCEPTION_NOVEL_CREATE_FAIL, EXCEPTION_NOVEL_REPEAT_TITLE } from "src/constant/exception/novel";

@Injectable()
export class NovelService {
    @InjectRepository(NovelEntity)
    private readonly novelRepo: Repository<NovelEntity>

    @InjectRepository(UserEntity)
    private readonly userEntity: Repository<UserEntity>

    /**
     * 创建书本
     * @param userId 
     * @param data 
     */
    async createBook(userId: number, data: CreateNovelDto): Promise<NovelItemResponseDto> {
        let foundData: NovelEntity;
        const user = new UserEntity()
        user.id = userId;
        try {
            foundData = await this.novelRepo.findOne({
                where: {
                    title: data.title.trim(),
                    creator: user,
                }
            })
        } catch {
            throw new BadRequestException(EXCEPTION_QUERY_FAIL)
        }

        if (foundData) {
            throw new BadRequestException('书本名重复');
        }

        const novel = new NovelEntity();
        novel.title = data.title;
        if (data.cover) {
            novel.cover = data.cover;
        }


        novel.creator = user;

        try {
            const res = await this.novelRepo.save(novel);
            return new NovelItemResponseDto(res);
        } catch (e) {
            throw new BadRequestException('书本创建失败')
        }
    }

    async queryUserAllNovel(userId: number) {
        const user = new UserEntity();
        user.id = userId;

        try {
            const res = await this.novelRepo.find({
                where: {
                    creator: user,
                }
            })

            return res || [];
        } catch {
            throw new BadRequestException(EXCEPTION_QUERY_FAIL)
        }

    }

    async queryUserNovelByPage(query: UserNovelPageQueryDto): Promise<NovelItemResponseDto[]> {
        try {
            const queryBuilder = this.novelRepo.createQueryBuilder('novel');

            queryBuilder.where('novel.creatorId = :userId', { userId: query.userId })
            if (query.lastId) {
                queryBuilder.andWhere('novel.id < :lastId', { lastId: query.lastId })
            }
            queryBuilder.orderBy('id', 'DESC')
            queryBuilder.printSql();
            const foundData = await queryBuilder.getMany();

            const responseData = foundData.map((item) => new NovelItemResponseDto(item))
            return responseData;
        } catch {
            throw new BadRequestException(EXCEPTION_QUERY_FAIL);
        }
    }
}