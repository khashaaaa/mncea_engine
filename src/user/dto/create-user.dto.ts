import { UserRole } from "../../enum/role"

export class CreateUserDto {

    username: string
    mobile?: string
    avatar?: string
    password: string
    role?: UserRole
}
