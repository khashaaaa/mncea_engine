import { UserRole } from "../../enum/role"

export class UpdateUserDto {

    username?: string
    mobile?: string
    password?: string
    avatar?: string
    role?: UserRole
}