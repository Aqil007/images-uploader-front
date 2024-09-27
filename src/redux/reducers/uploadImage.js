import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../variable";

export const uploadImages = createAsyncThunk(
  "images/uploadImage",
  async (arg, {getState, rejectWithValue }) => {
    console.log(arg);
    try {
       await axios.post(`${baseUrl}/upload`,{fileStr:arg.source, id:arg.id}).then((res)=>{
        if(res)
        arg.push("/")
       }).catch((err)=>{
        console.log(err);
       })
      
    } catch (error) {
      console.log("error", error);
      rejectWithValue(error.response);
    }
  }
);

const uploadImageSlice = createSlice({
  name: "UPLOAD_IMAGE",
  initialState: {
    isSucess: false,
    msg: "",
    isLoading: false,
  },
  reducers: {},
  extraReducers: {
    [uploadImages.pending]: (state, { payload }) => {
      state.isLoading = true;
      state.isSucess = false;
    },
    [uploadImages.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isSucess = true;
      state.msg="success"
    },
    [uploadImages.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isSucess = false;
      state.msg="failed"
    },
  },
});

export default uploadImageSlice;
