import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm"
import { UserRole } from "../../enum/role"

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    mark: string

    @Column()
    username: string

    @Column()
    mobile: string

    @Column()
    password: string

    @Column({ nullable: true })
    avatar: string

    @Column({
        type: 'enum',
        enum: UserRole,
        nullable: true
    })
    role: UserRole

    @CreateDateColumn()
    created: Date
}