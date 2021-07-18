import { BadRequestException, Injectable, InternalServerErrorException, PreconditionFailedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserProFile } from "src/dto/userProfile.dto";
import { UserSignUp } from "src/dto/userSignUp.dto";
import { User, UserDocument } from "src/entities/user.entity";

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>
    ) { }
    public async signUp(signUpInfo: Partial<UserSignUp>): Promise<Partial<UserProFile>> {
        const email = signUpInfo.email.trim();
        let password = signUpInfo.password.trim();
        if (!email || !password) {
            throw new BadRequestException("Email or password not entered");
        }
        if (await this.isExistedEmail(email)) {
            throw new BadRequestException("Email already exists");
        }
        await new this.userModel(signUpInfo).save();
        delete signUpInfo.password;
        return signUpInfo;
    }
    public async login(email: string, password: string): Promise<string> {
        email = email.trim();
        password = password.trim();
        if (!email || !password) {
            throw new BadRequestException("Email or password not entered");
        }
        return await this.verifyCredential(email, password) ? "Success" : "Failed";
    }
    private async isExistedEmail(email: string): Promise<Boolean> {
        const user = await this.userModel.findOne({ email: email });

        return user ? true : false;
    }
    private async verifyCredential(email: string, password: string): Promise<Boolean> {
        const user = await this.userModel.findOne({ email: email, password: password });
        return user ? true : false;

    }
    public async getUserInfoById(userId: string) {
        try {
            const user = await this.userModel.findById(userId);
            if (!user) {
                throw new BadRequestException("Can not find this user");
            }
            return user;
        } catch (error) {
            throw new InternalServerErrorException(error)
        }

    }
    public async findOne(username: string): Promise<UserDocument> {
        try {
            const user = await this.userModel.findOne({ email: username });
            if (!user) {
                throw new BadRequestException("This user not exist")
            }
            return user;
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }


    public async googleLogin(req) {
        if (!req.user) {
            return 'No user from google'
        }

        return {
            message: 'User information from google',
            user: req.user
        }
    }
}