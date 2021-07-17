import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { LocalAuthGuard } from "src/auth/local.authguard";
import { UserLogin } from "src/dto/login.dto";
import { UserSignUp } from "src/dto/userSignUp.dto";
import { UsersService } from "./users.service";

@ApiTags('User')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
    constructor(
        private usersService: UsersService
    ) { }
    @Post('signUp')
    @ApiOperation({ description: 'Register an account' })
    @ApiBody({type: UserSignUp})
    async signUp(
        @Body() userSignUp: UserSignUp
    ) {
        return this.usersService.signUp(userSignUp)
    }

    @Post('login')
    @ApiOperation({ description: 'Login with an account' })
    @ApiBody({type: UserLogin})
    async login(
        @Body('email') email: string,
        @Body('password') password: string
    ) {
        return this.usersService.login(email, password);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('user/:userId')
    @ApiParam({type: String, required: true, name: 'userId'})
    async getUserInfoById(@Param('userId') userId: string) {
        return this.usersService.getUserInfoById(userId);
    }
}