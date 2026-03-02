import { asyncThunkCreator, buildCreateSlice, PayloadAction } from '@reduxjs/toolkit';

const createSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

type AuthSteps = 'AuthStepOne' | 'AuthStepTwo' | 'AuthCompleted';

type AuthState = {
  stepState: AuthSteps;
  isBlockedCodeMessage: boolean;
};

const initialState: AuthState = {
  stepState: 'AuthStepOne',
  isBlockedCodeMessage: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setStepState: (state, action: PayloadAction<AuthSteps>) => {
      state.stepState = action.payload;
    },
    setIsBlockedCodeMessage: (state, action: PayloadAction<boolean>) => {
      state.isBlockedCodeMessage = action.payload;
    },
  },
  selectors: {
    selectStepState: store => store.stepState,
    selectIsBlockedCodeMessage: store => store.isBlockedCodeMessage,
    selectIsAuthCompleted: store => store.stepState === 'AuthCompleted',
  },
});

export const authReducer = authSlice.reducer;
export const { selectStepState, selectIsBlockedCodeMessage, selectIsAuthCompleted } =
  authSlice.selectors;

export const { setStepState, setIsBlockedCodeMessage } = authSlice.actions;
