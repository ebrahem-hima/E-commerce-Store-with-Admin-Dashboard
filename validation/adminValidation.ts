import * as z from "zod";

export const couponSchema = z.object({
  couponCode: z.string().nonempty({ message: "Coupon Code is required" }),
  couponName: z.string().nonempty({ message: "Coupon Name is required" }),
  couponType: z.enum(
    ["fixed_discount", "percentage", "shipping", "price_discount"],
    {
      message: "discount Type is required",
    }
  ),
  // couponType: z.enum(["fixed", "percentage", "shipping"], {
  //   message: "Coupon Type is required",
  // }),
  discountValue: z.number().refine((val) => val > 0, {
    message: "Discount Value is required",
  }),
  appliesTo: z.array(z.object()).optional(),
  expired_at: z
    .string()
    .nonempty({ message: "Expiration Date is required" })
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Expiration Date must be a valid date",
    }),
  usage_limit_per_user: z.number().refine((val) => val > 0, {
    message: "Usage User Limit is required",
  }),
  max_uses_total: z.number().refine((val) => val > 0, {
    message: "Max Usage Limits is required",
  }),
});
