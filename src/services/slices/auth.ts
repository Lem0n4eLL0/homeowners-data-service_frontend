import { sendVerificationCode, verificationCode } from '@/api/api';
import { RequestError, RequestStatus } from '@/api/apiTypes';
import { asyncThunkCreator, buildCreateSlice, PayloadAction } from '@reduxjs/toolkit';

const createSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

type AuthSteps = 'AuthStepOne' | 'AuthStepTwo' | 'AuthCompleted';

type AuthState = {
  stepState: AuthSteps;
  accountExists: boolean | undefined;
  data: {
    phone: string | undefined;
  };
  statuses: {
    sendCodeStatus: RequestStatus;
    verifyCodeStatus: RequestStatus;
  };
  isBlockedCodeMessage: boolean;
};

const initialState: AuthState = {
  stepState: 'AuthStepOne',
  accountExists: undefined,
  data: {
    phone: undefined,
  },
  statuses: {
    sendCodeStatus: { status: 'READY' },
    verifyCodeStatus: { status: 'READY' },
  },
  isBlockedCodeMessage: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: create => ({
    sendVerificationCode: create.asyncThunk(sendVerificationCode, {
      pending: state => {
        state.statuses.sendCodeStatus.status = 'PENDING';
        state.statuses.sendCodeStatus.error = undefined;
      },
      rejected: (state, action) => {
        state.statuses.sendCodeStatus.status = 'ERROR';
        state.statuses.sendCodeStatus.error = action.error as RequestError;
      },
      fulfilled: (state, action) => {
        state.statuses.sendCodeStatus.status = 'SUCCESS';
        state.statuses.sendCodeStatus.error = undefined;
        state.accountExists = action.payload.accountExists;
        state.stepState = 'AuthStepTwo';
      },
    }),

    verificationCode: create.asyncThunk(verificationCode, {
      pending: state => {
        state.statuses.verifyCodeStatus.status = 'PENDING';
        state.statuses.verifyCodeStatus.error = undefined;
      },
      rejected: (state, action) => {
        state.statuses.verifyCodeStatus.status = 'ERROR';
        state.statuses.verifyCodeStatus.error = action.error as RequestError;
      },
      fulfilled: state => {
        state.statuses.verifyCodeStatus.status = 'SUCCESS';
        state.statuses.sendCodeStatus.error = undefined;
        state.stepState = 'AuthCompleted';
      },
    }),

    setStepState: create.reducer((state, action: PayloadAction<AuthSteps>) => {
      state.stepState = action.payload;
    }),
    setIsBlockedCodeMessage: create.reducer((state, action: PayloadAction<boolean>) => {
      state.isBlockedCodeMessage = action.payload;
    }),
  }),

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
