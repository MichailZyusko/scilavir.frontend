import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../redux/store';

// Define a type for the slice state
type CartState = {
  cart: Map<string, number>;
};

// Define the initial state using that type
const initialState: CartState = {
  cart: new Map<string, number>(),
};

export const cartSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: {
    setProductsCount: (state, action: PayloadAction<{ id: string, quantity: number }>) => {
      state.cart.set(action.payload.id, action.payload.quantity);
    },
    increaseProductCounts: (state, action: PayloadAction<{ id: string }>) => {
      const quantity = state.cart.get(action.payload.id);

      if (quantity) {
        state.cart.set(action.payload.id, quantity + 1);
      } else {
        state.cart.set(action.payload.id, 1);
      }
    },
    decreaseProductCounts: (state, action: PayloadAction<{ id: string }>) => {
      const quantity = state.cart.get(action.payload.id);

      if (quantity) {
        state.cart.set(action.payload.id, quantity - 1);
      }
    },
    removeProductFromCart: (state, action: PayloadAction<{ id: string, quantity: number }>) => {
      state.cart.delete(action.payload.id);
    },
  },
});

export const {
  increaseProductCounts,
  decreaseProductCounts,
  removeProductFromCart,
  setProductsCount,
} = cartSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCart = (state: RootState) => state.cartReducer;

export default cartSlice.reducer;
