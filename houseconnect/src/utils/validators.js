import { z } from "zod";
import { KENYAN_COUNTIES, EMPLOYMENT_TYPES, APPLICATION_STATUSES, USER_ROLES } from "./constants";

/**
 * Login form schema.
 */
export const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

/**
 * Registration step 1: Personal information.
 */
export const personalInfoSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().min(10, "Enter a valid phone number"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

/**
 * Registration step 2: Role selection.
 */
export const roleSchema = z.object({
  role: z.enum(["worker", "employer"], { message: "Please select a role" }),
});

/**
 * Registration step 3: Profile information.
 */
export const profileInfoSchema = z.object({
  county: z.string().optional(),
  experience: z.string().optional(),
  expectedSalary: z.string().optional(),
});

/**
 * Job posting schema.
 */
export const jobPostingSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  responsibilities: z.array(z.string()).optional(),
  requirements: z.array(z.string()).optional(),
  benefits: z.array(z.string()).optional(),
  county: z.string().min(1, "County is required"),
  town: z.string().optional(),
  employment_type: z.string().min(1, "Employment type is required"),
  salary_min: z.number().min(0, "Minimum salary must be positive"),
  salary_max: z.number().min(0, "Maximum salary must be positive"),
  salary_currency: z.string().default("KES"),
});

/**
 * Job application schema.
 */
export const applicationSchema = z.object({
  cover_letter: z.string().min(10, "Cover letter must be at least 10 characters"),
});

/**
 * Profile update schema.
 */
export const profileUpdateSchema = z.object({
  full_name: z.string().min(2).optional(),
  phone: z.string().min(10).optional(),
  county: z.string().optional(),
  bio: z.string().optional(),
  skills: z.array(z.string()).optional(),
  experience: z.number().optional(),
  expected_salary: z.number().optional(),
  availability: z.string().optional(),
});

/**
 * Contact form schema.
 */
export const contactFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Enter a valid email address"),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

/**
 * Review schema.
 */
export const reviewSchema = z.object({
  rating: z.number().min(1, "Minimum rating is 1").max(5, "Maximum rating is 5"),
  comment: z.string().min(5, "Comment must be at least 5 characters").optional(),
});

/**
 * Password reset schema.
 */
export const passwordResetSchema = z.object({
  email: z.string().email("Enter a valid email address"),
});

/**
 * Password update schema.
 */
export const passwordUpdateSchema = z
  .object({
    currentPassword: z.string().min(6),
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
