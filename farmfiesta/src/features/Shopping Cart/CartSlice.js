import { createSlice } from "@reduxjs/toolkit";

export const selectCart = (state) => state.cart;

export const getTotalCartAmount = (state) => {
  let totalCartAmount = 0;
  for (const item of selectCart(state).cart) {
    totalCartAmount += item.price * item.count;
  }
  return totalCartAmount;
};
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const existingProductIndex = state.cart.findIndex(
        (x) => x.id === action.payload.id
      );
      if (existingProductIndex !== -1) {
        //product already exists increase count
        state.cart[existingProductIndex].count += 1;
      } else {
        state.cart.push({ ...action.payload, count: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((x) => x.id !== action.payload.id);
    },
    increaseCount: (state, action) => {
      const existingProductIndex = state.cart.findIndex(
        (x) => x.id === action.payload.id
      );
      if (existingProductIndex !== -1) {
        //product already exists increase count
        state.cart[existingProductIndex].count += 1;
      }
    },
    decreaseCount: (state, action) => {
      const existingProductIndex = state.cart.findIndex(
        (x) => x.id === action.payload.id
      );
      if (existingProductIndex !== -1) {
        //product already exists increase count
        state.cart[existingProductIndex].count -= 1;
        if (state.cart[existingProductIndex].count === 0) {
          state.cart = state.cart.filter((x) => x.id !== action.payload.id);
        }
      }
    },       
  }
 
});

export const { addToCart, removeFromCart, increaseCount, decreaseCount} =
  cartSlice.actions;
export default cartSlice.reducer;
