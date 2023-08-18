import { boolean, object, string, TypeOf } from "zod";

export const createUserSchema = object({
    body: object({
        firstName: string({
            required_error: "Name is required",
        }),
        lastName: string({
            required_error: "Last Name is required",
        }),
        premiumUser: boolean({
            required_error: "Premium status is required",
        }),
        password: string({
            required_error: "Password is required",
        }).regex(
            new RegExp(
                "^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$"
            ),
            "Password must contain at least one digit from 1 to 9, one lowercase letter, one uppercase letter, one special character and it must be 8-16 characters long."
        ),
        passwordConfirmation: string({
            required_error: "Password confirmation is required",
        }),
        email: string({ required_error: "Email is required" }).email(
            "Not a valid email"
        ),
    }).refine((data) => data.password === data.passwordConfirmation, {
        message: "Password do not match",
        path: ["passwordConfirmation"],
    }),
});

export type CreateUserInput = TypeOf<typeof createUserSchema>;