import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../variable";

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (arg, {getState, rejectWithValue }) => {
    try {
       await axios.post(`${baseUrl}/register`, arg.formData).then((res)=>{
          console.log(res);
          if(res){
            alert(res.data.msg)
            if(res.data.isSucess)
            arg.push("/login")
          }
       }).catch((err)=>{
        console.log(err);
       });
     
    } catch (error) {
      console.log("error", error);
      rejectWithValue(error.response);
    }
  }
);

const register = createSlice({
  name: "REGISTER",
  initialState: {
    isSucess: false,
    msg: "",
    isLoading: false,
  },
  reducers: {},
  extraReducers: {
    [registerUser.pending]: (state, { payload }) => {
      state.isLoading = true;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isSucess = true;
      state.msg = "Registered Successfully."
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isSucess = false;
      state.msg="failed"
    },
  },
});

export default register;
