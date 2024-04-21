import { Language } from "src/enum/language"

export class CreateMidcategoryDto {

    order: number
    name: string
    parent: number
    language: Language
}
