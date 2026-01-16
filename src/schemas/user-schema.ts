import { z } from 'zod';


const passwordRegex = /^(?=.*\d)[A-Za-z\d]{8,}$/;

// ---------------------------
// User Create Schema
export const userCreateSchema = z.object({
  username: z.string().min(3, "must have 3 or more characters"),
  email: z.string().email("invalid email address"),
  password: z
    .string()
    .min(8, "must have 8 characters")
    .regex(passwordRegex, "password must contain at least 1 number"),
  skills: z.array(z.string()).min(1, "at least 1 skill required"),
  experience: z.number().min(0, "experience must be a non-negative number"),
 role: z.enum(['admin', 'user'], { message: 'invalid role' }).optional(),

  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

// ---------------------------
// Login Schema
export const loginSchema = z.object({
  email: z.string().email('invalid email address'),
  password: z
    .string()
    .min(8, 'must have 8 characters')
    .regex(passwordRegex, "password must contain at least 1 number"),
  role: z.enum(['admin', 'user']).optional(),
});

// ---------------------------
// Get By ID Schema
export const getByIDSchema = z.object({
  id: z.string().min(1, { message: "ID is required" }),
});

// ---------------------------
// Delete Schema
export const deleteSchema = z.object({
  id: z.string().min(1, 'ID is required'),
});

// ---------------------------
// Partial Update Schema
export const partialUpdateSchema = z
  .object({
    id: z.string().min(1, { message: 'ID is required' }),
    username: z.string().min(3, { message: '3 or more characters required' }).optional(),
    email: z.string().email({ message: 'invalid email' }).optional(),
    password: z
      .string()
      .min(8, { message: '8 characters required' })
      .regex(passwordRegex, 'password must contain at least 1 number')
      .optional(),
    skills: z.array(z.string()).min(1, { message: 'at least 1 skill required' }).optional(),
    experience: z.number().min(0, { message: 'experience not negative' }).optional(),
    role: z.enum(['admin', 'user']).optional(),
  })
  .partial(); // Makes all fields optional except id
