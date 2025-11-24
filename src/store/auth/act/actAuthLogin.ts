import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosErrorHandler } from "src/utils/index";
import axios from "axios";


export const actAuthLogin = createAsyncThunk(
  "auth/actAuthLogin",
  async (data, { rejectWithValue }) => {

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
