import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateNovelDto } from "./dto/createNovel.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { NovelEntity } from "src/entities/novel.entity";
import { Repository } from "typeorm";
import { UserEntity } from "src/entities/user.entity";

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
            await this.novelRepo.save(novel)
        } catch (e) {
            console.error('e');
            throw new BadRequestException()
        }
    }
}