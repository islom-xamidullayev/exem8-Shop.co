import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  pictures:string;
  colors:string[];
  size: string
}

interface CartState {
  cart: CartItem[];
}

const initialState: CartState = {
  cart: JSON.parse(localStorage.getItem("cart") || "[]"),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.cart.find((item) => item.productId === action.payload.productId );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.cart.push(action.payload);
      }

      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    updateQuantity: (state, action: PayloadAction<{ productId: string; quantity: number }>) => {
      const item = state.cart.find((item) => item.productId === action.payload.productId);
      if (item && action.payload.quantity > 0) {
        item.quantity = action.payload.quantity;
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cart = state.cart.filter((item) => item.productId !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
  },
});

export const { addToCart, updateQuantity, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
