import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { OAuth2Client } from "google-auth-library";
import { google } from "googleapis";
import { AuthService } from "src/auth/auth.service";
import { UsersService } from "../users.service";

@Injectable()
export class GoogleService {
    constructor(
        private authService: AuthService,
        private usersService: UsersService
    ) { }
    public async getGoogleAccessToken(req: any) {
        if (!req.user) {
            return "No user from google";
        }
        return req.user;
    }
    public async loginWithGoogle(accessToken: string) {
        const data = await this.getGoogleProfile(accessToken);
        const newUser = {
            email: data.email,
            password: `${data.email}password`
        }
        let checkUser = await this.usersService.getUserByEmail(newUser.email);
        if (!checkUser) {
            checkUser = await this.usersService.addNewUser(newUser.email, `${data.email}password`);
        }
        return this.authService.login(checkUser);
    }
    public async getGoogleProfile(accessToken: string): Promise<any> {
        try {
            let oauth2Client = new google.auth.OAuth2();    // create new auth client
            oauth2Client.setCredentials({ access_token: accessToken });    // use the new auth client with the access_token
            let oauth2 = google.oauth2({
                auth: oauth2Client,
                version: 'v2'
            });
            let { data } = await oauth2.userinfo.get();    // get user info
            return data;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}