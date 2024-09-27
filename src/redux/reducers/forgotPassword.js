import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../variable";

export const forgPAssword = createAsyncThunk(
  "user/forgotPassword",
  async (arg, { getState, rejectWithValue }) => {
    let data = undefined;
    try {
      await axios
        .post(`${baseUrl}/forgot-password`, arg.fData)
        .then((res) => {
          alert(res.data.msg);
          data = res.data;
          if (res.data.isSucess) arg.push("/login");
        })
        .catch((err) => {
          // getState()
          alert(err.response.data.msg);
          data = err.response.data;
          rejectWithValue(err.response.data);
        });
      return data;
    } catch (error) {
      console.log("error", error);
      rejectWithValue(error.response);
    }
  }
);

const forgotPassword = createSlice({
  name: "FORGOT_PASSWORD",
  initialState: {
    isSucess: false,
    msg: "",
    isLoading: false,
  },
  reducers: {},
  extraReducers: {
    [forgPAssword.pending]: (state, { payload }) => {
      state.isLoading = true;
    },
    [forgPAssword.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isSucess = payload.isSucess;
      state.msg = payload.msg;
    },
    [forgPAssword.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isSucess = payload.isSucess;
      state.msg = "failed";
    },
  },
});

export default forgotPassword;
