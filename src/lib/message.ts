export const MESSAGES = {
  wishlist: {
    alreadyExists: (name: string) => `${name} is already in your wishlist.`,
    added: (name: string) => `${name} has been added to your wishlist.`,
    removed: (name: string) => `${name} has been removed from your wishlist.`,
  },
  cart: {
    alreadyExists: (name: string) => `${name} is already in your cart.`,
    added: (name: string) => `${name} has been added to your cart.`,
    removed: (name: string) => `${name} has been removed from your cart.`,
    outOfStock: (name: string) => `${name} is currently out of stock.`,
  },
  auth: {
    loginSuccess: "You have logged in successfully.",
    logoutSuccess: "You have logged out successfully.",
    signUpSuccess: "You have signed Up in successfully.",
  },
};
