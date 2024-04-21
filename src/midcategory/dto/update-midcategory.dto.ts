import { Language } from "src/enum/language"

export class UpdateMidcategoryDto {

    order: number
    name?: string
    parent?: number
    language: Language
}
