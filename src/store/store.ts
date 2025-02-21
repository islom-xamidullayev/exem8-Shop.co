import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import favoritesReducer from "./favoritesSlice";
import cartReducer from "./cartSlice";

// LocalStorage-dan savatcha ma'lumotlarini olish
const loadCartFromStorage = (): CartItem[] => {
  try {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  } catch (error) {
    console.error("LocalStorage o'qishda xato:", error);
    return [];
  }
};

// LocalStorage-ga savatcha ma'lumotlarini saqlash
const saveCartToStorage = (cart: CartItem[]) => {
  try {
    localStorage.setItem("cart", JSON.stringify(cart));
  } catch (error) {
    console.error("LocalStorage saqlashda xato:", error);
  }
};

// **Interfeyslar**
interface CartItem {
  id: number;
  _id: string;
  name: string;
  price: number;
  pictures: string;
  quantity: number;
}

interface UpdateQuantityPayload {
  productId: any;
  _id: string;
  actionType: "increase" | "decrease";
}

// **Redux Toolkit Slice**
const cartSlice = createSlice({
  name: "cart",
  initialState: loadCartFromStorage(),
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingProduct = state.find((product) => product._id === action.payload._id);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
      saveCartToStorage(state);
    },
    updateQuantity: (state, action: PayloadAction<UpdateQuantityPayload>) => {
      const { productId, actionType } = action.payload;
      const product = state.find((product) => product._id === productId);
      if (product) {
        if (actionType === "increase") {
          product.quantity += 1;
        } else if (actionType === "decrease" && product.quantity > 1) {
          product.quantity -= 1;
        }
      }
      saveCartToStorage(state);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const updatedCart = state.filter((product) => product._id !== action.payload);
      saveCartToStorage(updatedCart);
      return updatedCart;
    },
  },
});

// **Redux store-ni yaratish**
export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    cart: cartReducer,
   
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // LocalStorage ishlatilgani uchun kerak
    }),
});





// **Type-larni eksport qilish**
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// **Actionlarni eksport qilish**
export const { addToCart, updateQuantity, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
