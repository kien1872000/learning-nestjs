import { Body, Controller, Post } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { UserLogin } from "src/dto/login.dto";
import { UserSignUp } from "src/dto/userSignUp.dto";
import { UsersService } from "./users.service";

@ApiTags('User')
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
}