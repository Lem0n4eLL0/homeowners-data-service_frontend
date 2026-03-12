import { RequestError, RequestStatus } from '@/api/apiTypes';
import { User } from '@/common/commonTypes';
import { EMPTY_USER, READY_REQUEST_STATUS } from '@/common/constants';
import { asyncThunkCreator, buildCreateSlice, PayloadAction } from '@reduxjs/toolkit';
import { logoutMeAuth, sendVerificationCodeAuth } from './auth';
import { getMe, getProfile, registrationProfile, updateProfile } from '@/api/api';

const createSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

type UserState = {
  isProfileRegistered: {
    isGetProfile: boolean;
    isGetMe: boolean;
  };
  data: {
    user: User;
  };
  statuses: {
    getProfileStatus: RequestStatus;
    updateProfileStatus: RequestStatus;
    registrationProfileStatus: RequestStatus;
    getMeStatus: RequestStatus;
  };
};

const initialState: UserState = {
  isProfileRegistered: {
    isGetProfile: false,
    isGetMe: false,
  },
  data: {
    user: EMPTY_USER,
  },
  statuses: {
    getProfileStatus: READY_REQUEST_STATUS,
    updateProfileStatus: READY_REQUEST_STATUS,
    registrationProfileStatus: READY_REQUEST_STATUS,
    getMeStatus: READY_REQUEST_STATUS,
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: create => ({
    getProfile: create.asyncThunk(getProfile, {
      pending: state => {
        state.statuses.getProfileStatus.status = 'PENDING';
        state.statuses.getProfileStatus.error = undefined;
      },
      rejected: (state, action) => {
        state.statuses.getProfileStatus.status = 'ERROR';
        state.statuses.getProfileStatus.error = action.error as RequestError;
        state.isProfileRegistered.isGetProfile = false;
      },
      fulfilled: (state, action) => {
        state.statuses.getProfileStatus.status = 'SUCCESS';
        state.statuses.getProfileStatus.error = undefined;
        state.data.user = {
          ...state.data.user,
          ...action.payload,
        };
        state.isProfileRegistered.isGetProfile = true;
      },
    }),

    getMe: create.asyncThunk(getMe, {
      pending: state => {
        state.statuses.getMeStatus.status = 'PENDING';
        state.statuses.getMeStatus.error = undefined;
      },
      rejected: (state, action) => {
        state.statuses.getMeStatus.status = 'ERROR';
        state.statuses.getMeStatus.error = action.error as RequestError;
        state.isProfileRegistered.isGetMe = false;
      },
      fulfilled: (state, action) => {
        state.statuses.getMeStatus.status = 'SUCCESS';
        state.statuses.getMeStatus.error = undefined;
        state.data.user.phone = action.payload.phone;
        state.data.user.email = action.payload.email;
        state.isProfileRegistered.isGetMe = true;
      },
    }),

    registrationProfile: create.asyncThunk(registrationProfile, {
      pending: state => {
        state.statuses.registrationProfileStatus.status = 'PENDING';
        state.statuses.registrationProfileStatus.error = undefined;
      },
      rejected: (state, action) => {
        state.statuses.registrationProfileStatus.status = 'ERROR';
        state.statuses.registrationProfileStatus.error = action.error as RequestError;
      },
      fulfilled: (state, action) => {
        state.statuses.registrationProfileStatus.status = 'SUCCESS';
        state.statuses.registrationProfileStatus.error = undefined;
        state.data.user = {
          ...state.data.user,
          ...action.payload,
        };
      },
    }),

    updateProfile: create.asyncThunk(updateProfile, {
      pending: state => {
        state.statuses.updateProfileStatus.status = 'PENDING';
        state.statuses.updateProfileStatus.error = undefined;
      },
      rejected: (state, action) => {
        state.statuses.updateProfileStatus.status = 'ERROR';
        state.statuses.updateProfileStatus.error = action.error as RequestError;
      },
      fulfilled: (state, action) => {
        state.statuses.updateProfileStatus.status = 'SUCCESS';
        state.statuses.updateProfileStatus.error = undefined;
        state.data.user = {
          ...state.data.user,
          ...action.payload,
        };
      },
    }),

    setPhone: create.reducer((state, action: PayloadAction<string>) => {
      state.data.user.phone = action.payload;
    }),

    resetErrorStatuses: create.reducer(state => {
      if (state.statuses.getMeStatus.status === 'ERROR')
        state.statuses.getMeStatus = READY_REQUEST_STATUS;
      if (state.statuses.getProfileStatus.status === 'ERROR')
        state.statuses.getProfileStatus = READY_REQUEST_STATUS;
      if (state.statuses.registrationProfileStatus.status === 'ERROR')
        state.statuses.registrationProfileStatus = READY_REQUEST_STATUS;
      if (state.statuses.updateProfileStatus.status === 'ERROR')
        state.statuses.updateProfileStatus = READY_REQUEST_STATUS;
    }),
  }),

  extraReducers: builder => {
    builder.addCase(logoutMeAuth.fulfilled, () => initialState);
    builder.addCase(sendVerificationCodeAuth.pending, (state, action) => {
      state.data.user.phone = action.meta.arg.phone;
    });
  },

  selectors: {
    selectUser: state => state.data.user,
    selectProperties: state => state.data.user.properties,
    selectStatuses: state => state.statuses,
    selectIsProfileRegistered: state => state.isProfileRegistered,
  },
});

export const userReduser = userSlice.reducer;

export const {
  registrationProfile: registrationProfileUser,
  getProfile: getProfileUser,
  updateProfile: updateProfileUser,
  getMe: getMeUser,
  setPhone: setPhoneUser,
  resetErrorStatuses: resetErrorStatusesUser,
} = userSlice.actions;

export const {
  selectUser,
  selectProperties,
  selectIsProfileRegistered,
  selectStatuses: selectStatusesUser,
} = userSlice.selectors;
