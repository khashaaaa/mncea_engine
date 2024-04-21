import { Language } from "src/enum/language"
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Subcategory {

    @PrimaryGeneratedColumn()
    mark: number

    @Column({ nullable: true, generated: 'increment' })
    order: number

    @Column()
    name: string

    @Column()
    grandParent: number

    @Column()
    parent: number

    @Column({
        type: 'enum',
        enum: Language
    })
    language: Language
}
