export const MESSAGES = {
  wishlist: {
    added: (name: string) => `${name} has been added to your wishlist.`,
    removed: (name: string) => `${name} has been removed from your wishlist.`,
    ExistCartShop: "These products are already in your cart.",
    loginRequired: "Please log in to add items to your favorites list.",
  },
  cart: {
    added: (name?: string) => `${name || "Items"} has been added to your cart.`,
    removed: (name: string) => `${name} has been removed from your cart.`,
    outOfStock: (names: string) =>
      names.includes(",")
        ? `Some products (${names}) are currently out of stock and cannot be added to your cart..`
        : `${names} is currently out of stock and cannot be added to your cart..`,
  },
  auth: {
    loginSuccess: "You have logged in successfully.",
    logoutSuccess: "You have logged out successfully.",
    signUpSuccess: "You have signed Up in successfully.",
  },
  table: {
    tableUpdate: "Table has been updated successfully.",
    tableRemove: (name: string) => `${name} has been removed.`,
  },
  account: {
    update: "Changes have been updated",
    noChanges: "No changes to save",
  },
  password: {
    updatePassword: "Password changed successfully!",
    passwordSame: "New password cannot be the same as the current password",
    resetEnterEmail: "Please enter your email address to reset your password.",
    resetCheckEmail:
      "Check your Gmail inbox and follow the link to reset your password.",
    resetSamePassword: "New password should be different from the old password",
  },
  buy: {
    success: "Your purchase has been completed successfully.",
    no_products: "You don’t have any items in your cart to buy.",
  },

  coupon: {
    notFound: "This coupon code does not exist.",
    invalid: "This coupon is no longer valid or has reached its usage limit.",
  },
  contact: {
    success: "Your message has been sent successfully!",
    error: "Failed to send your message. Please try again later.",
  },
};
