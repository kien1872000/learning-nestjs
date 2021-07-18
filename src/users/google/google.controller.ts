import { Controller, Get, UseGuards, Request, Post, Body } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBody, ApiProperty, ApiTags } from "@nestjs/swagger";
import { GoogleLogin } from "src/dto/googleLogin.dto";
import { GoogleService } from "./google.service";
@ApiTags('Login')
@Controller('google')
export class GoogleController {
    constructor(private googleService: GoogleService) { }
    @Get('redirect')
    @UseGuards(AuthGuard('google'))
    async googleAuthRedirect(@Request() req) {
        return this.googleService.getGoogleAccessToken(req)
    }

    @Post('login')
    @ApiBody({type: GoogleLogin})
    async loginWithGoogle(@Body('accessToken') accessToken: string) {
        console.log(accessToken);
        return this.googleService.loginWithGoogle(accessToken);
        
    } 
}
