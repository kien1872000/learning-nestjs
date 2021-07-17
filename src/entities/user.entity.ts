import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";
@Schema({timestamps: true})
export class User {
    @Prop({type: String, required: true})
    email: string;
    @Prop({type: String, required: true})
    password: string;
    @Prop({type: String})
    disPlayName: string;
    @Prop({type: Number})
    age: number;
    @Prop({type: String})
    address: string;
}
export type UserDocument = User & Document
export const UserSchema = SchemaFactory.createForClass(User);
