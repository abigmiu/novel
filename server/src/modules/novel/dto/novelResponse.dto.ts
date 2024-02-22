import { Expose } from "class-transformer";

export class NovelItemResponseDto {
    constructor(data: NovelItemResponseDto) {
        Object.assign(this, data);
    }
    
    /**
     * 创建时间
     */
    @Expose()
    createAt: number;

    /**
     * 更新时间
     */
    @Expose()
    updateAt: number;

    /** 
     * 书本名
     */
    @Expose()
    title: string;

    /**
     * 书本ID
     */
    @Expose()
    id: number;

    /**
     * 封面图
     */
    @Expose()
    cover?: string;

    /** 
     * 已发布的章节数
     */
    @Expose()
    publishChapterCount: number;
}