import { createSlice } from "@reduxjs/toolkit";
import actAuthRegister from "./act/actAuthRegister";
import actAuthLogin from "./act/actAuthLogin";
import type { TLoading } from "@customTypes/shared";
import { isString } from "@customTypes/guards";
import type { TuserData } from "@customTypes/userData";

interface IAuthState {
  user: TuserData[] | null;
  accessToken: string | null;
  loading: TLoading;
  error: string | null;
}

const initialState: IAuthState = {
  loading: 'idle',
  error: null,
  user: [],
  accessToken: null
};


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authLogout: (state) => {
      state.user = null;
      state.accessToken = null;
    },
    resetUI: (state) => {
      state.loading = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    //register
    builder
      .addCase(actAuthRegister.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actAuthRegister.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.user = action.payload;
      })
      .addCase(actAuthRegister.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload || "Error sending OTP";
      });

    // login
    builder.addCase(actAuthLogin.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actAuthLogin.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.accessToken = action.payload.accessToken;
      state.user = action.payload;
    });
    builder.addCase(actAuthLogin.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
        console.log('error', action.payload);

      }
    });
  },
});

export { actAuthRegister, actAuthLogin };
export const { authLogout, resetUI } = authSlice.actions;
export default authSlice.reducer;
