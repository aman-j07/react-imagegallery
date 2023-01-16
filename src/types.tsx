import { SerializedError } from "@reduxjs/toolkit";

export interface post {
  comments: string[];
  dislike: boolean;
  like: boolean;
  src: string;
}

export interface imgGalleryReducer{
  posts: post[];
  loading: boolean;
  error: SerializedError;
};

export interface storeInt {
  imgGalleryReducer:imgGalleryReducer
}
