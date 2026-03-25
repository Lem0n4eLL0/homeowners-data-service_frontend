import {
  combineSlices,
  configureStore,
  TypedAddListener,
  TypedStartListening,
} from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { authReducer } from './slices/auth';
import { userReduser } from './slices/user';
import { appReduser } from './slices/app';
import { listenerMiddleware } from './listeners/authListeners';
import { applicationReduser } from './slices/applications';
import { servicesReduser } from './slices/services';

const rootRedusers = combineSlices({
  auth: authReducer,
  user: userReduser,
  app: appReduser,
  application: applicationReduser,
  services: servicesReduser,
});

export const store = configureStore({
  reducer: rootRedusers,
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export const startAppListening = listenerMiddleware.startListening as TypedStartListening<
  RootState,
  AppDispatch
>;

export type AppStartListening = typeof startAppListening;
export type AppAddListener = TypedAddListener<RootState, AppDispatch>;
