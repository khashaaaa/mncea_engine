import { Language } from "src/enum/language"

export class CreateSubcategoryDto {

    name: string
    ganrdParent: number
    parent: number
    language: Language
}
