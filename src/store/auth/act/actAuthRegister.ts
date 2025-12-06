import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosErrorHandler } from "src/utils/index";
import axios from "axios";
import type { TRegisterFormData } from "@customTypes/userData";


export const actAuthRegister = createAsyncThunk(
  "auth/actRegister",
  async (data: TRegisterFormData, { rejectWithValue }) => {

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

export default actAuthRegister;
