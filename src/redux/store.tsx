import { configureStore } from "@reduxjs/toolkit";
import imgGalleryReducer from "./imgGallerySlice";

export const store=configureStore({
    reducer:{
        imgGalleryReducer,
    }
})