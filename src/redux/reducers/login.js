import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../variable";

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (arg, { getState, rejectWithValue }) => {
    let data = undefined;
    try {
      await axios
        .post(`${baseUrl}/login`, arg.formData)
        .then((res) => {
          alert(res.data.msg);
          localStorage.setItem("userLogin", JSON.stringify(res.data.user));
          data = res.data
          arg.push("/")
        })
        .catch((err) => {
          // getState()
          alert(err.response.data.msg);
          data = err.response.data
          rejectWithValue( err.response.data);
        });
      return data;
    } catch (error) {
      console.log("error", error);
      rejectWithValue(error.response);
    }
  }
);

const login = createSlice({
  name: "LOGIN",
  initialState: {
    isSucess: false,
    msg: "",
    isLoading: false,
  },
  reducers: {},
  extraReducers: {
    [loginUser.pending]: (state, { payload }) => {
      console.log("payload===", payload);
      state.isLoading = true;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      console.log("payload f", payload);
      state.isLoading = false;
      state.isSucess = payload.isSucess;
      state.msg = payload.msg;
    },
    [loginUser.rejected]: (state, { payload }) => {
      console.log("payload err", payload);
      state.isLoading = false;
      state.isSucess = payload.isSucess;
      state.msg = "failed";
    },
  },
});

export default login;
