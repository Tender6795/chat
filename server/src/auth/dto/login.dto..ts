import { IsEmail, IsString, MinLength, Validate } from "class-validator";
import { IsPasswordsMatchingConstraint } from "@common/decorators";

export class LoginDto{
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    password: string;
}