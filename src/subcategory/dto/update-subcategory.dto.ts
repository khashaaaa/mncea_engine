import { Language } from "src/enum/language"

export class UpdateSubcategoryDto {

    name?: string
    grandParent?: number
    parent?: number
    language: Language
}
