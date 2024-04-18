import { Column, Entity, Generated, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Headcategory {

    @PrimaryGeneratedColumn()
    mark: number

    @Column({ nullable: true })
    order: number

    @Column({ nullable: true })
    name: string

    @Column()
    language: string

    @Column()
    slug: string

    @Column('jsonb', { nullable: true })
    children
}
