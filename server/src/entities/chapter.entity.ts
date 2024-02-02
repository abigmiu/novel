import { Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CreateAndUpdateEntity } from "./extends/createAndUpdate.entity";
import { NovelEntity } from "./novel.entity";

@Entity('chapter')
export class ChapterEntity extends CreateAndUpdateEntity {
    @PrimaryGeneratedColumn()
    id: number;

    /**
     * 标题
     */
    @Column()
    title: string;

    /**
     * 第几章
     */
    @Column()
    chapterOrder: number;

    @ManyToOne(() => NovelEntity)
    novel: NovelEntity;

    /**
     *  
     * 内容
     */
    @Column({ type: 'longtext' })
    content: string;

    /** 
     * 是否发布
     */
    @Column({ default: false })
    published: boolean

    @Column({ default: false })
    deleted: boolean;
}