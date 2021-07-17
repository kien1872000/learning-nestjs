import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString, MinLength } from "class-validator";

export class UserSignUp {
    @ApiProperty({type: String, required: true, description: "User Password"})
    @IsString()
    @MinLength(6)
    password: string;

    @ApiProperty({type: String, required: true, description: "User email"})
    @IsString()
    email: string;

    @ApiProperty({type: String, required: true, description: "User display name"})
    @IsString()
    displayName: string;

    @ApiProperty({type: Number, description: "User age", default: 0})
    @IsInt()
    age: number;

    @ApiProperty({type: String, description: "User address", default: ""})
    @IsString()
    address: string
}