import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Headcategory {

    @PrimaryGeneratedColumn()
    mark: number

    @Column()
    name: string

    @Column()
    language: string

    @Column()
    slug: string

    @Column('jsonb', { nullable: true })
    children
}
