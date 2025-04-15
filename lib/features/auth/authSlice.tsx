// lib/features/auth/authSlice.ts
import { User } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";



interface AuthState {
  user: User | null;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  loading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.loading = false;
    },
    logout(state) {
      state.user = null;
      state.loading = false;
    },
    stopLoading(state) {
      state.loading = false;
    },
  },
});

export const { setUser, logout, stopLoading } = authSlice.actions;
export default authSlice.reducer;
