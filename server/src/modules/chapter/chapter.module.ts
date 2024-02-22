import { Module } from "@nestjs/common";
import { ChapterController } from "./chapter.controller";
import { ChapterService } from "./chapter.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ChapterEntity } from "src/entities/chapter.entity";

@Module({
    imports: [TypeOrmModule.forFeature([ChapterEntity])],
    controllers: [ChapterController],
    providers: [ChapterService]
})
export class ChapterModule {

}