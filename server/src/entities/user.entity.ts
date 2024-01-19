import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Exclude } from 'class-transformer'
@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({ name: 'create_at', type: 'timestamp' })
    createAt: number;

    @UpdateDateColumn({ name: 'update_at', type: 'timestamp' })
    updateAt: number;

    @Column({ name: 'nick_name', length: 25, comment: '昵称，最多25个字' })
    nickname: string;

    @Column({ name: 'avatar', comment: '头像，255字限制' })
    avatar: string;

    @Column({ name: 'email', length: 50, comment: '邮箱, 最长50个字符' })
    email: string;

    @Exclude()
    @Column({ name: 'password', comment: '密码，加密后的' })
    password: string;
}