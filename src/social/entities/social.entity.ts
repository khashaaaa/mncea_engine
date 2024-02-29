import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Social {

    @PrimaryGeneratedColumn()
    mark: number

    @Column()
    name: string

    @Column()
    link: string
}