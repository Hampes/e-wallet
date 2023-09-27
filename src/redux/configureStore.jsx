import { configureStore } from "@reduxjs/toolkit";
import cardSlice from "../features/cards/cardSlice";

const store = configureStore({
  reducer: {
    cards: cardSlice,
  },
});

export default store;
