import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosErrorHandler } from "src/utils/index";
import axios from "axios";
import type { TLoginFormData } from "@customTypes/userData";


export const actAuthLogin = createAsyncThunk(
  "auth/actAuthLogin",
  async (data: TLoginFormData, { rejectWithValue }) => {

    try {
      const response = await axios.post("auth/login", {
        ...data, username: 'emilys', password: 'emilyspass'
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));

    }
  }
);

export default actAuthLogin;
