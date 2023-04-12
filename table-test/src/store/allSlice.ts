import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  TFullDataCategory,
} from '../services/types';

type TAllState = {
  categories: TFullDataCategory[] | null,
};
const initialState : TAllState = {
  categories: null,
};

const allSlice = createSlice({
  name: 'all',
  initialState,
  reducers: {
    setCurrentGoods: (state, action: PayloadAction<TFullDataCategory[]>) => ({
      ...state, categories: action.payload,
    }),
  },

});

const allReducer = allSlice.reducer;

export const {
  setCurrentGoods,
} = allSlice.actions;

export default allReducer;
