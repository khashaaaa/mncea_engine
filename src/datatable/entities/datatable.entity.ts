import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Datatable {

    @PrimaryGeneratedColumn()
    mark: number

    @Column()
    language: string

    @Column()
    title: string

    @Column()
    description: string

    @Column('jsonb')
    table
}