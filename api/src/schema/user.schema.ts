import { object, string, TypeOf } from "zod";

export const registerUserSchema = object({
  body: object({
    name: string({
      required_error: "Name is required",
    }),
    password: string({
      required_error: "Name is required",
    }).min(6, "Password too short - should be 6 chars minimum"),
    passwordConfirmation: string({
      required_error: "Pasword Confirmation is required",
    }),
    email: string({ required_error: "Email is required" }).email(
      "Valid Email is required"
    ),
  }).refine((data: any) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["Password Confirmation"],
  }),
});

export const loginUserSchema = object({
  body: object({
    email: string({
      required_error: "Email is Required",
    }),
    password: string({
      required_error: "Password is required",
    }).min(6, "Password length should be greater than 6 characters"),
  }),
});

export type registerUserInput = Omit<
  TypeOf<typeof registerUserSchema>,
  "body.passwordConfirmation"
>;

export type loginUserInput = TypeOf<typeof loginUserSchema>;
