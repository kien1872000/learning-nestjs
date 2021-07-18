import { ApiProperty } from "@nestjs/swagger";

export class GoogleLogin {
    @ApiProperty({name: 'accessToken', required: true})
    accessToken: string;
}