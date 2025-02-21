
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface FavoriteItem {
  id: number;
  _id: string;
  name: string;
  price: number;
  pictures: string;
}

const loadFavoritesFromStorage = (): FavoriteItem[] => {
  try {
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  } catch (error) {
    console.error("LocalStorage o'qishda xato:", error);
    return [];
  }
};

const saveFavoritesToStorage = (favorites: FavoriteItem[]) => {
  try {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  } catch (error) {
    console.error("LocalStorage saqlashda xato:", error);
  }
};

const initialState: FavoriteItem[] = loadFavoritesFromStorage();

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<FavoriteItem>) => {
      const existingItem = state.find((item) => item._id === action.payload._id);
      if (!existingItem) {
        state.push(action.payload);
        saveFavoritesToStorage(state);
      }
    },
    removeFromFavorites: (state, action: PayloadAction<{ id: string }>) => {
      const updatedFavorites = state.filter((product) => product._id !== action.payload.id);
      saveFavoritesToStorage(updatedFavorites);
      return updatedFavorites;
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
