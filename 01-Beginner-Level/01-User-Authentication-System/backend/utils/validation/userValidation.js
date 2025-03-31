const z = require("zod");

const userSignUpValidation = z.object({
  name: z.string().min(5, { message: "Must be 5 or more characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  age: z.number({
    required_error: "Age is required",
    invalid_type_error: "Age must be a number",
  }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

const userLogInValidation = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

module.exports = { userSignUpValidation, userLogInValidation };
