import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosErrorHandler } from "src/utils/index";
import axios from "axios";


export const actRegister = createAsyncThunk(
  "auth/actRegister",
  async (data, { rejectWithValue }) => {

    try {
      const response = await axios.post("/users/add", {
        data,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));

    }
  }
);

export default actRegister;
