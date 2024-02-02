import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { CreateAndUpdateEntity } from "./extends/createAndUpdate.entity"
import { UserEntity } from "./user.entity";
import { ChapterEntity } from "./chapter.entity";

@Entity('novel')
export class NovelEntity extends CreateAndUpdateEntity {
    /**
     * id
     */
    @PrimaryGeneratedColumn()
    id: number;

    /**
     * 书本名
     */
    @Column()
    title: string;

    /**
     * 封面图
     */
    @Column({ nullable: true, name: 'cover' })
    cover?: string;

    /**
     * 创建者
     */
    @ManyToOne(() => UserEntity, user => user.id)
    creator: UserEntity;

    /**
     * 已发布的章节数
     */
    @Column({ name: 'publish_chapterCount', default: 0 })
    publishChapterCount: number;

    /**
     * 所有的章节数
     */
    @Column({ name: 'chapter_count', default: 0 })
    chapterCount: number;

    @OneToMany(() => ChapterEntity, chapter => chapter.id)
    chapters: ChapterEntity[]

    @Column({ default: false })
    deleted: boolean;
}