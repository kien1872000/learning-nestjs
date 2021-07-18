import { Body, Controller, Get, Request, Param, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { LocalAuthGuard } from "src/auth/local.authguard";
import { UserLogin } from "src/dto/login.dto";
import { UserSignUp } from "src/dto/userSignUp.dto";
import { UsersService } from "./users.service";
import { JwtAuthGuard } from "src/auth/jwt.authguard";
import { AuthService } from "src/auth/auth.service";
@ApiTags('User')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
    constructor(
        private usersService: UsersService,
        private authService: AuthService
    ) { }
    @Post('signUp')
    @ApiOperation({ description: 'Register an account' })
    @ApiBody({ type: UserSignUp })
    async signUp(
        @Body() userSignUp: UserSignUp
    ) {
        return this.usersService.signUp(userSignUp)
    }



    @UseGuards(JwtAuthGuard)
    @Get('user/info')
    async getUserInfoById(@Request() req) {

        return this.usersService.getUserInfoById(req.user.userId);

    }

   
}


@ApiTags('Login')
@Controller('users')
export class UserLoginController {
    constructor(private authService: AuthService) { }
    @UseGuards(LocalAuthGuard)
    @Post('login')
    @ApiOperation({ description: 'Login with an account' })
    @ApiBody({ type: UserLogin })
    @Post('auth/login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }
}