import { Language } from "src/enum/language"
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Midcategory {

    @PrimaryGeneratedColumn()
    mark: number

    @Column({ nullable: true, generated: 'increment' })
    order: number

    @Column()
    name: string

    @Column()
    parent: number

    @Column({
        type: 'enum',
        enum: Language
    })
    language: Language
}
