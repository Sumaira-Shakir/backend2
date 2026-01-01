import { z } from "zod";


// Categories array
export const categories = ["electronics", "fashion", "mobile", "home"] as const;

// Single product schema
export const productBodySchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  description: z
    .string()
    .max(50, "Description must be 50 characters or less"),
  price: z.number().min(0, "Price must be greater than or equal to 0"),
  quantity: z.number().min(0, "Quantity must be 0 or more"),
  category: z.enum(categories),
  tags: z.array(z.string()).default([]),
  ratings: z.number().min(1, "Rating must be at least 1").max(5, "Rating must be at most 5"),
});

// ✅ Array of products schema
export const productArraySchema = z.array(productBodySchema);


//  Get product by ID
export const getByIdSchema = z.object({
  id: z.string().min(1, "Product id is required"),
});

//  Patch (partial update)
export const patchSchema = z.object({
  id: z.string().min(1, "Product id is required"),
  name: z.string().min(3).optional(),
  description: z.string().max(50).optional(),
  price: z.number().min(0).optional(),
  quantity: z.number().min(0).optional(),
  category: z.enum(categories).optional(),
  tags: z.array(z.string()).optional(),
  ratings: z.number().min(1).max(5).optional(),
});

//  Delete product
export const deleteSchema = z.object({
  id: z.string().min(1, "ID is required"),
});
