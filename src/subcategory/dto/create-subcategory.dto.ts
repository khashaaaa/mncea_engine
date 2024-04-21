import { Language } from "src/enum/language"

export class CreateSubcategoryDto {

    order: number
    name: string
    ganrdParent: number
    parent: number
    language: Language
}
