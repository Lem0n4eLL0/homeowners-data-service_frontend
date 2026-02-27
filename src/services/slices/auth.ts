import { asyncThunkCreator, buildCreateSlice, PayloadAction } from '@reduxjs/toolkit';

const createSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

type AuthSteps = 'AuthStepOne' | 'AuthStepTwo' | 'AuthCompleted';

type AuthState = {
  stepState: AuthSteps;
};

const initialState: AuthState = {
  stepState: 'AuthStepOne',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setStepState: (state, action: PayloadAction<AuthSteps>) => {
      state.stepState = action.payload;
    },
  },
  selectors: {
    selectStepState: store => store.stepState,
  },
});

export const authReducer = authSlice.reducer;
export const { selectStepState } = authSlice.selectors;
export const { setStepState } = authSlice.actions;
