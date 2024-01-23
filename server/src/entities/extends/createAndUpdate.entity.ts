import { BeforeInsert, BeforeUpdate, Column, Entity } from "typeorm";

@Entity()
export class CreateAndUpdateEntity {
    @Column({ 
        name: 'create_at',
        type: 'int',
        nullable: false,
        default: 0,
    })
    createAt: number;

    @Column({ 
        name: 'update_at',
        type: 'int',
        nullable: false,
        default: 0
    })
    updateAt: number;

    @BeforeInsert()
    beforeInsert() {
        const now = Math.ceil(Date.now() / 1000);
        this.createAt = now;
        this.updateAt = now;
    }

    @BeforeUpdate()
    beforeUpdate() {
        this.updateAt = Math.ceil(Date.now() / 1000);
    }
}