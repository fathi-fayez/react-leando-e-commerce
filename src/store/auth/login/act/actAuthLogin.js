import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosErrorHandler } from "../../../../utils";

const actAuthLogin = createAsyncThunk(
  "auth/actAuthLogin",
  async ({ formData }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const payload = {
        ...formData,
      };
      const response = await axios.post(
        "/auth/login",
        payload
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actAuthLogin;
