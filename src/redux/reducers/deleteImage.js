import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../variable";

export const delImage = createAsyncThunk(
  "images/deleteImage",
  async (arg, { getState, rejectWithValue,dispatch }) => {
    try {
      let data = undefined;
      await axios
        .post(`${baseUrl}/delete`, arg)
        .then((res) => {
          if (res) {
            data = res.data;
            // return dispatch(getImages(arg.userId));
          }
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

const deleteImage = createSlice({
  name: "DELETE_IMAGE",
  initialState: {
    isSucess: false,
    msg: "",
    isLoading: false,
  },
  reducers: {},
  extraReducers: {
    [delImage.pending]: (state, { payload }) => {
      state.isLoading = true;
    },
    [delImage.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.data = payload;
      state.isSucess = true;
    },
    [delImage.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isSucess = false;
      state.msg = "failed";
    },
  },
});

export default deleteImage;
