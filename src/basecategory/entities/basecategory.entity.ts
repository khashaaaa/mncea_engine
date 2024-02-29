import { Language } from "src/enum/language"
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Basecategory {

    @PrimaryGeneratedColumn()
    mark: number

    @Column()
    name: string

    @Column({
        type: 'enum',
        enum: Language
    })
    language: Language
}
