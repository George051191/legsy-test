import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import allReducer from './allSlice';

const store = configureStore({
  reducer: {
    all: allReducer,
  },
  middleware: [thunk]
});
export default store;