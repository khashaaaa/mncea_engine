import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Headcategory {

    @PrimaryGeneratedColumn()
    mark: number

    @Column()
    mn: string

    @Column()
    en: string

    @Column()
    keyword: string

    @Column('jsonb', { nullable: true })
    children
}
