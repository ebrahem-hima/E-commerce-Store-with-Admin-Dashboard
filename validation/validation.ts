import * as z from "zod";

export const placeOrderSchema = z.object({
  email: z.string().email("Please enter a valid email address"),

  firstName: z
    .string()
    .min(3, "First name must be at least 3 characters long") // أقل من 3 أحرف
    .regex(
      /^[A-Za-z0-9]+$/,
      "First name must not contain spaces or special characters",
    )
    .refine((val) => (val.match(/[A-Za-z]/g) || []).length >= 3, {
      message: "First name must contain at least 3 letters",
    }),

  lastName: z
    .string()
    .min(3, "Last name must be at least 3 characters long")
    .regex(
      /^[A-Za-z0-9]+$/,
      "Last name must not contain spaces or special characters",
    )
    .refine((val) => (val.match(/[A-Za-z]/g) || []).length >= 3, {
      message: "Last name must contain at least 3 letters",
    }),
  phone: z.string().min(3, "Phone number must be at least 3 characters long"),

  address1: z
    .string()
    .min(5, "Address 1 must be at least 5 characters long")
    .max(100, "Address 1 must be less than 100 characters")
    .regex(/^[a-zA-Z0-9\s,.-]+$/, "Address 1 contains invalid characters"),

  address2: z
    .string()
    .max(100, "Address 2 must be less than 100 characters")
    .regex(/^[a-zA-Z0-9\s,.-]*$/, "Address 2 contains invalid characters")
    .optional(),

  country: z.string().min(1, "Country is required"),
  state: z.string().min(1, "State is required"),
});

export const profileSchema = z.object({
  email: z.string().email("Please enter a valid email address"),

  firstName: z
    .string()
    .min(3, "First name must be at least 3 characters long") // أقل من 3 أحرف
    .regex(
      /^[A-Za-z0-9]+$/,
      "First name must not contain spaces or special characters",
    )
    .refine((val) => (val.match(/[A-Za-z]/g) || []).length >= 3, {
      message: "First name must contain at least 3 letters",
    }),

  lastName: z
    .string()
    .min(3, "Last name must be at least 3 characters long")
    .regex(
      /^[A-Za-z0-9]+$/,
      "Last name must not contain spaces or special characters",
    )
    .refine((val) => (val.match(/[A-Za-z]/g) || []).length >= 3, {
      message: "Last name must contain at least 3 letters",
    }),

  phone: z.string().min(3, "Phone number must be at least 3 characters long"),
});

export const addressSchema = z.object({
  address1: z
    .string()
    .min(5, "Address 1 must be at least 5 characters long")
    .max(100, "Address 1 must be less than 100 characters")
    .regex(/^[a-zA-Z0-9\s,.-]+$/, "Address 1 contains invalid characters"),

  address2: z
    .string()
    .max(100, "Address 2 must be less than 100 characters")
    .regex(/^[a-zA-Z0-9\s,.-]*$/, "Address 2 contains invalid characters")
    .optional(),
});

export const contactSchema = z.object({
  email: z.string().email("Please enter a valid email address"),

  userName: z
    .string()
    .min(3, "UserName must be at least 3 characters long")
    .regex(
      /^(?!\s)(?!.*\s{2,})([A-Za-z0-9\s]+)(?<!\s)$/,
      "UserName must not contain special characters or multiple spaces",
    )
    .refine((val) => (val.match(/[A-Za-z]/g) || []).length >= 3, {
      message: "UserName must contain at least 3 letters",
    }),

  phone: z.string().min(3, "Phone number must be at least 3 characters long"),
  message: z.string().min(3).max(200),
});

export const signupSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(50, "First name is too long")
    .regex(/^[A-Za-z]+$/, "First name must contain only letters"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(50, "Last name is too long")
    .regex(/^[A-Za-z]+$/, "Last name must contain only letters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character",
    ),
});

export const logInSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string(),
});
