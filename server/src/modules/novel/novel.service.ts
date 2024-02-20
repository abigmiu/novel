import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateNovelDto } from "./dto/createNovel.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { NovelEntity } from "src/entities/novel.entity";
import { Repository } from "typeorm";
import { UserEntity } from "src/entities/user.entity";
import { EXCEPTION_QUERY_FAIL } from "src/constant/exception/common";

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
    async createBook(userId: number, data: CreateNovelDto) {
        const novel = new NovelEntity();
        novel.title = data.title;
        if (data.cover) {
            novel.cover = data.cover;
        }
        const user = new UserEntity()
        user.id = userId;
        novel.creator = user;

        try {
            const res = await this.novelRepo.save(novel);
            return res;
        } catch (e) {
            console.error('e');
            throw new BadRequestException()
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
}