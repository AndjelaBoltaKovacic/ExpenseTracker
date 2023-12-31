import { omit } from "lodash";
import { FilterQuery } from "mongoose";
import UserModel, { UserDocument, UserInput } from "models/user.model";

export const createUser = async (input: UserInput) => {
    const newUser = await UserModel.create(input);

    return omit(newUser.toJSON(), "password");
};

export const validatePassword = async ({
    email,
    password,
}: {
    email: string;
    password: string;
}) => {
    const user = await UserModel.findOne({ email });

    if (!user) {
        return false;
    }

    const isValid = await user.comparePassword(password);

    if (!isValid) return false;

    return omit(user.toJSON(), "password");
};

export const findUser = async (query: FilterQuery<UserDocument>) => {
    return UserModel.findOne(query).lean();
};

export const findUserByEmail = async (email: string) => {
    const user = await UserModel.findOne({ email });

    if (user) {
        return user;
    }
    return null;
};