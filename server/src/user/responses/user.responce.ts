import { Provider, Role, User } from "@prisma/client";
import { Exclude } from "class-transformer";

export class UserResponce implements User{
    id: string;
    email: string;

    @Exclude()
    password: string;

    @Exclude()
    createdAt: Date;

    @Exclude()
    provider: Provider;

    updatedAt: Date;
    roles: Role[];

    constructor(user : User){
        Object.assign(this, user)
    }
}