import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Language } from "src/enum/language"

@Entity()
export class Page {

    @PrimaryGeneratedColumn('uuid')
    mark: string

    @Column()
    title: string

    @Column('text')
    content: string

    @Column()
    admin: string

    @Column()
    page: string

    @Column({
        type: 'enum',
        enum: Language
    })
    language: Language

    @CreateDateColumn()
    created: Date

    @UpdateDateColumn()
    updated: Date
}
