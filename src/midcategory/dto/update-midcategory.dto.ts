import { Language } from "src/enum/language"

export class UpdateMidcategoryDto {

    name?: string
    parent?: number
    language: Language
}
