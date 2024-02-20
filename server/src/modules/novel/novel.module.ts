import { Module } from "@nestjs/common";
import { NovelController } from "./novel.controller";
import { NovelService } from "./novel.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NovelEntity } from "src/entities/novel.entity";
import { UserEntity } from "src/entities/user.entity";

@Module({
    imports: [TypeOrmModule.forFeature([NovelEntity, UserEntity])],
    controllers: [NovelController],
    providers: [NovelService],
})
export class NovelModule {

}