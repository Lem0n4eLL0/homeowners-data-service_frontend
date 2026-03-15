import { createApplication, getApplicationsHistory } from '@/api/api';
import { Application, RequestError, RequestStatus } from '@/api/apiTypes';
import { READY_REQUEST_STATUS } from '@/common/constants';
import { asyncThunkCreator, buildCreateSlice } from '@reduxjs/toolkit';

const createSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

type ProfileState = {
  data: {
    application: Array<Application>;
  };
  statuses: {
    createApplicationStatus: RequestStatus;
    getApplicationHistory: RequestStatus;
  };
};

const initialState: ProfileState = {
  data: {
    application: [],
  },
  statuses: {
    createApplicationStatus: READY_REQUEST_STATUS,
    getApplicationHistory: READY_REQUEST_STATUS,
  },
};

const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: create => ({
    createApplication: create.asyncThunk(createApplication, {
      pending: state => {
        state.statuses.createApplicationStatus.status = 'PENDING';
        state.statuses.createApplicationStatus.error = undefined;
      },
      rejected: (state, action) => {
        state.statuses.createApplicationStatus.status = 'ERROR';
        state.statuses.createApplicationStatus.error = action.error as RequestError;
      },
      fulfilled: (state, action) => {
        state.statuses.createApplicationStatus.status = 'SUCCESS';
        state.statuses.createApplicationStatus.error = undefined;
        state.data.application.push(action.payload);
      },
    }),

    getApplicationHistory: create.asyncThunk(getApplicationsHistory, {
      pending: state => {
        state.statuses.getApplicationHistory.status = 'PENDING';
        state.statuses.getApplicationHistory.error = undefined;
      },
      rejected: (state, action) => {
        state.statuses.getApplicationHistory.status = 'ERROR';
        state.statuses.getApplicationHistory.error = action.error as RequestError;
      },
      fulfilled: (state, action) => {
        state.statuses.getApplicationHistory.status = 'SUCCESS';
        state.statuses.getApplicationHistory.error = undefined;
        state.data.application = [...state.data.application, ...action.payload];
      },
    }),
  }),

  selectors: {
    selectStatuses: store => store.statuses,
    selectData: store => store.data,
  },
});

export const applicationReduser = applicationSlice.reducer;

export const {
  createApplication: createApplicationApplication,
  getApplicationHistory: getApplicationHistoryApplication,
} = applicationSlice.actions;

export const { selectStatuses, selectData } = applicationSlice.selectors;
