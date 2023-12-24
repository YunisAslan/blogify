import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  user: { id: string; type: AccountType } | null;
}

const initialState: UserState = {
  user: JSON.parse(localStorage.getItem("user") as string) || null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loggedIn: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logOut: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

// Action creators are generated for each case reducer function
export const { loggedIn, logOut } = userSlice.actions;

export default userSlice.reducer;
