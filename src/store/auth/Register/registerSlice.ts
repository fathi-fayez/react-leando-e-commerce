import { createSlice } from "@reduxjs/toolkit";
import actRegister from "./act/actRegister";
import type { TLoading } from "@customTypes/shared";
import type { TuserData } from "@customTypes/userData";

interface IRegisterState {
  user: TuserData[];
  loading: TLoading;
  error: string | null;
}

const initialState: IRegisterState = {
  loading: 'idle',
  error: null,
  user: [],
};


const registerSlice = createSlice({
  name: "authRegister",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(actRegister.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actRegister.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.user = action.payload;
      })
      .addCase(actRegister.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload || "Error sending OTP";
      });
  },
});

export { actRegister };
export default registerSlice.reducer;
