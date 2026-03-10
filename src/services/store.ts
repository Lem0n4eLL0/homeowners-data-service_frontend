import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { authReducer } from './slices/auth';
import { userReduser } from './slices/user';
import { profileReduser } from './slices/profile';

const rootRedusers = combineSlices({
  auth: authReducer,
  user: userReduser,
  profile: profileReduser,
});

export const store = configureStore({
  reducer: rootRedusers,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
