import { CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({ name: 'create_at' })
    createAt: Date;

    @UpdateDateColumn({ name: 'update_at' })
    updateAt: Date;
}