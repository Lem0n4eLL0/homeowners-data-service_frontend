import { asyncThunkCreator, buildCreateSlice } from '@reduxjs/toolkit';

const createSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

type AuthSteps = 'BeforeAuth' | 'AuthStepOne' | 'AuthStepTwo' | 'AuthCompleted';

type AuthState = {
  stepState: AuthSteps;
};

const initialState: AuthState = {
  stepState: 'BeforeAuth',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  selectors: {
    selectStepState: store => store.stepState,
  },
});

export const authReducer = authSlice.reducer;
export const { selectStepState } = authSlice.selectors;
