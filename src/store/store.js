import { configureStore } from '@reduxjs/toolkit';
import mediaReducer from './media/mediaSlice';

const store = configureStore({
	reducer: mediaReducer
});

export default store;
