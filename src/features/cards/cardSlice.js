import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getFirstUser = createAsyncThunk("cards/getFirstUser", async () => {
  let response = await axios.get("https://randomuser.me/api/");

  return response.data;
});

const cardSlice = createSlice({
  name: "cards",
  initialState: {
    cards: [],
  },

  reducers: {
    addCard: (state, action) => {
      state.cards.push(action.payload);
    },
    setSelectedMonth: (state, action) => {
      state.selectedMonth = action.payload;
    },
    setSelectedYear: (state, action) => {
      state.selectedYear = action.payload;
    },
    removeCard: (state, action) => {
      const newCards = state.cards.filter(
        (_, index) => index !== action.payload
      );

      state.cards = newCards;
    },

    updateCardIsActive: (state, action) => {
      const { cardNum, isActive } = action.payload;

      const cardIndex = state.cards.findIndex(
        (card) => card.cardNum === cardNum
      );

      if (cardIndex !== -1) {
        state.cards[cardIndex].isActive = isActive;
      }
    },
    updateCardIsInactive: (state, action) => {
      const { isActive } = action.payload;

      state.cards.forEach((card) => {
        card.isActive = isActive;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getFirstUser.fulfilled, (state, action) => {
      const { first, last } = action.payload.results[0].name;

      state.cards.push({
        first,
        last,
        cardNum: "1234 9585 1111 9999",
        saveValidTo: "12/26",
        cardVendor: "amex",
        cardCvv: 111,
        isActive: true,
      });
    });
  },
});

export default cardSlice.reducer;

export const {
  addCard,
  setSelectedMonth,
  setSelectedYear,
  removeCard,
  updateCardIsActive,
  updateCardIsInactive,
} = cardSlice.actions;
