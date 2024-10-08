export interface IBusiness {
    id?: number
    name: string
    location: string
    manager: IUser
}

export interface ILog {
    id?: number
    idNumber: string
    name: string
    phone: string
    fingerPrint: string
    reason: string
    timeIn: string
    timeOut: string
    business: IBusiness
}

export interface IUser {
    id?: number
    username: string
    password?: string
    role: Role
}

export const enum Role {
    ADMIN = "ADMIN",
    USER = "USER",
    BUSINESSMANAGER = "BUSINESSMANAGER"
}