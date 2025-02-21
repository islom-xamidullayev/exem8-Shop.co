
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
    const storedFavorites = localStorage.getItem("favoritess");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  } catch (error) {
    console.error("LocalStorage o'qishda xato:", error);
    return [];
  }
};

const saveFavoritesToStorage = (favoritess: FavoriteItem[]) => {
  try {
    localStorage.setItem("favoritess", JSON.stringify(favoritess));
  } catch (error) {
    console.error("LocalStorage saqlashda xato:", error);
  }
};

const initialState: FavoriteItem[] = loadFavoritesFromStorage();

const favoritesSlices = createSlice({
  name: "favoritess",
  initialState,
  reducers: {
    addToFavoritess: (state, action: PayloadAction<FavoriteItem>) => {
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

export const { addToFavoritess, removeFromFavorites } = favoritesSlices.actions;
export default favoritesSlices.reducer;
