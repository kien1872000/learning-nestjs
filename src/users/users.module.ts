import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "src/auth/auth.module";
import { GoogleStrategy } from "src/auth/google/google.strategy";
import { User, UserSchema } from "src/entities/user.entity";
import { GoogleController } from "./google/google.controller";
import { GoogleService } from "./google/google.service";
import { UserLoginController, UsersController } from "./users.controller";
import { UsersService } from "./users.service";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: User.name,
                schema: UserSchema
            }
        ]),
        forwardRef(()=>AuthModule)
    ],
    controllers: [UsersController, GoogleController, UserLoginController],
    providers: [UsersService, GoogleService],
    exports: [UsersService]
})
export class UsersModule { }