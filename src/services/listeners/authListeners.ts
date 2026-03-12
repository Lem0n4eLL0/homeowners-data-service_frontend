import { createListenerMiddleware } from '@reduxjs/toolkit/react';
import { verificationCodeAuth } from '../slices/auth';
import { getMeUser, getProfileUser } from '../slices/user';
import { AppStartListening } from '../store';

export const listenerMiddleware = createListenerMiddleware();

export const startAppListening = listenerMiddleware.startListening as AppStartListening;

startAppListening({
  actionCreator: verificationCodeAuth.fulfilled,
  effect: async (action, listenerApi) => {
    await Promise.all([listenerApi.dispatch(getMeUser()), listenerApi.dispatch(getProfileUser())]);
  },
});
