import { Language } from "src/enum/language"

export class CreateMidcategoryDto {

    name: string
    parent: number
    language: Language
}
