import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../redux/store';

// Define a type for the slice state
type CartState = {
  cart: Record<string, number>;
};

// Define the initial state using that type
const initialState: CartState = {
  cart: {},
};

export const cartSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: {
    setProductsCount: (state, action: PayloadAction<{ id: string, quantity: number }>) => {
      state.cart[action.payload.id] = action.payload.quantity;
    },
    increaseProductCounts: (state, action: PayloadAction<{ id: string }>) => {
      const quantity = state.cart[action.payload.id];

      if (quantity) {
        state.cart[action.payload.id] = quantity + 1;
      } else {
        state.cart[action.payload.id] = 1;
      }
    },
    decreaseProductCounts: (state, action: PayloadAction<{ id: string }>) => {
      const quantity = state.cart[action.payload.id];

      // Delete product from cart if quantity is 1
      if (quantity === 1) {
        delete state.cart[action.payload.id];
      } else if (quantity) {
        state.cart[action.payload.id] = quantity - 1;
      }
    },
    removeProductFromCart: (state, action: PayloadAction<{ id: string }>) => {
      delete state.cart[action.payload.id];
    },
    clearCart: (state) => {
      state.cart = {};
    },
  },
});

export const {
  increaseProductCounts,
  decreaseProductCounts,
  removeProductFromCart,
  setProductsCount,
  clearCart,
} = cartSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCart = (state: RootState) => state.cartReducer;

export default cartSlice.reducer;
