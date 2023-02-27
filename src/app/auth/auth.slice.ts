import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../redux/store';

// Define a type for the slice state
type AuthState = {
  isLogged: boolean;
};

// Define the initial state using that type
const initialState: AuthState = {
  isLogged: false,
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<{ refreshToken: string, accessToken: string }>) => {
      window.localStorage.setItem('a-token', action.payload.accessToken);
      window.localStorage.setItem('r-token', action.payload.refreshToken);

      state.isLogged = true;
    },
    signUp: (state, action: PayloadAction<{ refreshToken: string, accessToken: string }>) => {
      window.localStorage.setItem('a-token', action.payload.accessToken);
      window.localStorage.setItem('r-token', action.payload.refreshToken);
    },
    signOut: (state) => {
      window.localStorage.setItem('a-token', '');
      window.localStorage.setItem('r-token', '');

      state.isLogged = false;
    },
  },
});

export const {
  signIn,
  signUp,
  signOut,
} = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectAuth = (state: RootState) => state.authReducer;

export default authSlice.reducer;
