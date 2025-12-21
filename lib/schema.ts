import z from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const signSchema = z
  .object({
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirm_password: z
      .string()
      .min(6, "Confirm password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

const egyptPhoneRegex = /^(\+20|0)?1[0125][0-9]{8}$/;
export const userSchema = z.object({
  full_name: z
    .string()
    .optional()
    .refine((val) => !val || val.trim().split(" ").length >= 2, {
      message: "Full name must contain at least two words",
    }),
  user_name: z
    .string()
    .min(2, "Username must be at least two letters")
    .nonempty("Username is required"),
  bio: z
    .string()
    .min(1, "Bio is required")
    .refine((val) => val.trim().split(" ").length >= 5, {
      message: "Bio must contain at least five words",
    }),
  phone: z
    .string()
    .nonempty("Phone number is required")
    .regex(egyptPhoneRegex, "Phone number must be a valid Egyptian number"),
  avatar: z.any().optional(),
  role: z
    .enum(["student", "instructor", "admin"])
    .refine((val) => !!val, { message: "Role is required" }),
});
