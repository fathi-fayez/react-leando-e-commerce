import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosErrorHandler } from "../../../../utils";

const actAuthLogout = createAsyncThunk(
  "auth/actAuthLogout",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.post("/auth/logout");
      return response.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actAuthLogout;
