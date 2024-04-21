import { Language } from "src/enum/language"

export class UpdateSubcategoryDto {

    order: number
    name?: string
    grandParent?: number
    parent?: number
    language: Language
}
