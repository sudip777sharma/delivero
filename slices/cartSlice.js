import { createSlice, createSelector } from "@reduxjs/toolkit";

const initialState = {
  items: null,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      if (state.items) {
        state.items = [...state.items, action.payload];
      } else {
        state.items = [action.payload];
      }
    },
    removeFromCart: (state, action) => {
      if (state.items) {
        const indexToRemove = state.items.findIndex(
          (item) => item._id === action.payload.id
        );
        if (indexToRemove !== -1) {
          state.items.splice(indexToRemove, 1);
        }
      }
    },
    emptyCart: (state, action) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, emptyCart } = cartSlice.actions;

// Memoized selectors
export const selectCartItems = (state) => state.cart.items;
export const selectCartItemsById = createSelector(
  [selectCartItems, (_, id) => id],
  (items, id) => (items || []).filter((item) => item._id === id)
);
export const selectCartTotal = createSelector([selectCartItems], (items) =>
  (items || []).reduce((total, item) => total + item.price, 0)
);

export default cartSlice.reducer;
