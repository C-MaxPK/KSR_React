import { configureStore } from '@reduxjs/toolkit';
import mediaReducer from './media/mediaSlice';

const store = configureStore({
	reducer: mediaReducer
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
