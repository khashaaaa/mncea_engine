import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Headcategory {

    @PrimaryGeneratedColumn()
    mark: number

    @Column({ nullable: true, generated: 'increment' })
    order: number

    @Column({ nullable: true })
    name: string

    @Column()
    language: string

    @Column()
    slug: string

    @Column({ default: false })
    grid: boolean

    @Column({ default: false })
    haslink: boolean

    @Column({ nullable: true })
    link: string

    @Column('jsonb', { nullable: true })
    children
}
