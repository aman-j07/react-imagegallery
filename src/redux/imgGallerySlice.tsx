import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { imgGalleryReducer } from "../types";

const initialState:imgGalleryReducer = {
  posts:[],
  loading:false,
  error:{}
};

export const loadImages = createAsyncThunk("images/loadImages", async () => {
  console.log('async called')
  let res;
  try{
   res = await axios.get(
    "https://api.pexels.com/v1/curated?page=11&per_page=30",
    {
      headers: {
        Authorization:
          "563492ad6f91700001000001b1388687b41444c18f4a7606bf4bc329",
        "Content-Type": "multipart/mixed",
      },
    }
  );
  }catch(err){
    console.log(err)
  }
  console.log(res)
  if(res!==undefined){
  let temp = res.data.photos.map((ele:any) => {
    return {
      comments:[],
      like:false,
      dislike:false,
      src:ele.src.original
    };
  });
  console.log(temp)
  return temp
}
});

export const imgGallerySlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    toggleLike:(state,action)=>{
      state.posts[action.payload].like=!state.posts[action.payload].like
    },
    toggleDislike:(state,action)=>{
      state.posts[action.payload].dislike=!state.posts[action.payload].dislike
    },
    addComment:(state,action)=>{
      
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadImages.pending, (state, action) => {
        state.loading=false;
      })
      .addCase(loadImages.fulfilled, (state, action) => {
        state.loading=false;
        if(action.payload!==undefined)
        state.posts=action.payload
      })
      .addCase(loadImages.rejected, (state, action) => {
        if(action.error!==undefined)
        state.error=action.error
      });
  },
});

export const {toggleLike,toggleDislike}=imgGallerySlice.actions;
export default imgGallerySlice.reducer;
