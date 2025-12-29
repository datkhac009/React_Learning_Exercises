import { z } from "zod";

export const productSchema = z.object({
  //validate name
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(60, "Name must not exceed 60 characters"),

  //validate category
  category: z.string().min(1, "Category is required"),

  //validate price
  // coerce tự động convert string → number
  price: z.coerce
    .number({
      required_error: "Price is required",
      invalid_type_error: "Price must be a number",
    })
    .positive("Price must be greater than 0")
    .max(100000000, "Price must be less than 100,000,000"),

  //validate stock
  stock: z.coerce
    .number({
      required_error: "Stock is required",
      invalid_type_error: "Stock must be a number",
    })
    .nonnegative("Stock must be greater than or equal to 0"),

  //validate status
  status: z.enum(["active", "inactive"]),

  //validate date
  createdAt: z.string().min(1, "Created date is required"),
});
