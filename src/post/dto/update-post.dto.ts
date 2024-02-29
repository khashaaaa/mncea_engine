import { Priority } from "src/enum/priority"
import { Language } from "../../enum/language"

export class UpdatePostDto {

    title?: string
    content?: string
    posted_date?: Date
    admin?: string
    thumbnail?: string
    language: Language
    priority?: Priority
    base_category?: number
    mid_category?: number
    sub_category?: number
}
