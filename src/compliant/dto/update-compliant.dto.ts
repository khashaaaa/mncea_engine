import { CompliantType } from "src/enum/compliant-type"

export class UpdateCompliantDto {

    user?: string
    email?: string
    mobile?: string
    type?: CompliantType
    statement?: string
}
