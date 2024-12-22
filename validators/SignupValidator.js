const { z } = require('zod');

const signupSchema = z.object({
    name: z
        .string({ required_error: "Name is required." })
        .trim()
        .min(3, { message: "Name must have at least 3 characters." })
        .max(200, { message: "Name must not exceed 200 characters." })
        .regex(/^[a-zA-Z\s]+$/, { message: "Name should only contain letters and spaces." }),

    email: z
        .string({ required_error: "Email is required." })
        .trim()
        .email({ message: "Invalid email address." })
        .min(3, { message: "Email must be at least 3 characters long." })
        .max(200, { message: "Email must not exceed 200 characters." }),

    password: z
        .string({ required_error: "Password is required." })
        .trim()
        .min(6, { message: "Password must be at least 6 characters long." })
        .max(20, { message: "Password must not exceed 20 characters." })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
        .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter." })
        .regex(/[0-9]/, { message: "Password must contain at least one digit." })
        .regex(/[\W_]/, { message: "Password must contain at least one special character." }),

    mobile: z
        .string({ required_error: "Mobile number is required." })
        .trim()
        .length(10, { message: "Mobile number must be exactly 10 digits." })
        .regex(/^\d{10}$/, { message: "Mobile number must only contain digits." }),

    address: z
        .string({ required_error: "Address is required." })
        .trim()
        .min(10, { message: "Address must be at least 10 characters long." })
        .max(400, { message: "Address must not exceed 400 characters." }),
});

module.exports = signupSchema;
