import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as bcrypt from 'bcrypt';

@Schema()
export class User {
    @Prop()
    id: string;

    @Prop({required: true})
    name: string;

    @Prop({required: true, unique: true})
    email: string;

    @Prop({required: true, })
    password: string;

    static async hashPassword(password: string): Promise<string> {
        const saltOrRounds = 10;
        return await bcrypt.hash(password, saltOrRounds);
    }
}

export const UserModel = {
    name: User.name,
    schema: SchemaFactory.createForClass(User)
}