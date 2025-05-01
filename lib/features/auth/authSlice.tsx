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
    updateUser(state, action: PayloadAction<User>) {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
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

export const { setUser, updateUser, logout, stopLoading } = authSlice.actions;
export default authSlice.reducer;
