import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../variable";

export const getImages = createAsyncThunk(
  "images/getData",
  async (arg, { getState, rejectWithValue }) => {
    try {
      let data = undefined;
      await axios
        .get(`${baseUrl}/images/${arg}`)
        .then((res) => {
          if(res)
          data = res.data;

        })
        .catch((err) => {
          alert(err.response.msg);
          console.log(err.response);
        });
      return data;
    } catch (error) {
      console.log("error", error);
      rejectWithValue(error.response);
    }
  }
);

const getImageSlice = createSlice({
  name: "GET_IMAGE",
  initialState: {
    data: [],
    isSucess: false,
    msg: "",
    isLoading: false,
  },
  reducers: {},
  extraReducers: {
    [getImages.pending]: (state, { payload }) => {
      state.isLoading = true;
    },
    [getImages.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.data = payload;
      state.isSucess = true;
    },
    [getImages.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isSucess = false;
      state.msg = "failed";
    },
  },
});

export default getImageSlice;
