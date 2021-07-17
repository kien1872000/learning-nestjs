import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength } from "class-validator";

export class UserLogin{
    @ApiProperty({type: String, required: true, description: "User Password"})
    @IsString()
    @MinLength(6)
    password: string;

    @ApiProperty({type: String, required: true, description: "User email"})
    @IsString()
    email: string;
}