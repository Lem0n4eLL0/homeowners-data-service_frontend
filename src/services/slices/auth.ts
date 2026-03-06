import { sendVerificationCode, verificationCode } from '@/api/api';
import { RequestError, RequestStatus } from '@/api/apiTypes';
import { READY_REQUEST_STATUS } from '@/common/constants';
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
};

const initialState: AuthState = {
  stepState: 'AuthStepOne',
  accountExists: undefined,
  data: {
    phone: undefined,
  },
  statuses: {
    sendCodeStatus: READY_REQUEST_STATUS,
    verifyCodeStatus: READY_REQUEST_STATUS,
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: create => ({
    sendVerificationCode: create.asyncThunk(sendVerificationCode, {
      pending: (state, action) => {
        state.data.phone = action.meta.arg.phone;
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

    setPhone: create.reducer((state, action: PayloadAction<string>) => {
      state.data.phone = action.payload;
    }),

    resetStatuses: create.reducer(state => {
      state.statuses.sendCodeStatus = READY_REQUEST_STATUS;
      state.statuses.verifyCodeStatus = READY_REQUEST_STATUS;
    }),

    backToStepOne: create.reducer(state => {
      state.stepState = 'AuthStepOne';
      state.statuses.sendCodeStatus = READY_REQUEST_STATUS;
      state.statuses.verifyCodeStatus = READY_REQUEST_STATUS;
    }),
  }),

  selectors: {
    selectStepState: store => store.stepState,
    selectIsAuthCompleted: store => store.stepState === 'AuthCompleted',
    selectIsAccountExists: store => store.accountExists,
    selectStatuses: store => store.statuses,
    selectData: store => store.data,
  },
});

export const authReducer = authSlice.reducer;
export const {
  selectStepState,
  selectIsAuthCompleted,
  selectIsAccountExists,
  selectStatuses: selectStatusesAuth,
  selectData: selectDataAuth,
} = authSlice.selectors;

export const {
  sendVerificationCode: sendVerificationCodeAuth,
  verificationCode: verificationCodeAuth,
  resetStatuses: resetStatusesAuth,
  backToStepOne,
  setStepState,
  setPhone,
} = authSlice.actions;
