import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "src/auth/auth.module";
import { User, UserSchema } from "src/entities/user.entity";
import { MailModule } from "src/mail/mai.module";
import { GoogleController } from "./google/google.controller";
import { GoogleService } from "./google/google.service";
import { UserLoginController, UsersController } from "./users.controller";
import { UsersService } from "./users.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    forwardRef(() => AuthModule),
    MailModule,
  ],
  controllers: [UsersController, GoogleController, UserLoginController],
  providers: [UsersService, GoogleService],
  exports: [UsersService],
})
export class UsersModule { }