import { RequestError, RequestStatus } from '@/api/apiTypes';
import { User } from '@/common/commonTypes';
import { EMPTY_USER, READY_REQUEST_STATUS } from '@/common/constants';
import { asyncThunkCreator, buildCreateSlice, PayloadAction } from '@reduxjs/toolkit';
import { logoutMeAuth } from './auth';
import { getProfile } from '@/api/api';

const createSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

type UserState = {
  data: {
    user: User;
  };
  statuses: {
    getProfileStatus: RequestStatus;
    updateProfileStatus: RequestStatus;
    registrationProfileStatus: RequestStatus;
  };
};

const initialState: UserState = {
  data: {
    user: EMPTY_USER,
  },
  statuses: {
    getProfileStatus: READY_REQUEST_STATUS,
    updateProfileStatus: READY_REQUEST_STATUS,
    registrationProfileStatus: READY_REQUEST_STATUS,
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
      },
      fulfilled: (state, action) => {
        state.statuses.getProfileStatus.status = 'SUCCESS';
        state.statuses.getProfileStatus.error = undefined;
        state.data.user = action.payload;
      },
    }),

    updateProfile: create.reducer((state, action: PayloadAction<User>) => {
      state.data.user = action.payload;
    }),
  }),

  extraReducers: builder => {
    builder.addCase(logoutMeAuth.fulfilled, () => initialState);
  },

  selectors: {
    selectUser: state => state.data.user,
    selectProperties: state => state.data.user.properties,
    selectStatuses: state => state.statuses,
  },
});

export const userReduser = userSlice.reducer;

export const { getProfile: getProfileUser, updateProfile: updateProfileUser } = userSlice.actions;

export const {
  selectUser,
  selectProperties,
  selectStatuses: selectStatusesUser,
} = userSlice.selectors;
