import { createApplication, getApplicationsHistory } from '@/api/api';
import { ApplicationFull, RequestError, RequestStatus } from '@/api/apiTypes';
import { READY_REQUEST_STATUS } from '@/common/constants';
import { asyncThunkCreator, buildCreateSlice, createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const createSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

type ProfileState = {
  isApplicationsInitializing: boolean;
  data: {
    applications: Array<ApplicationFull>;
  };
  statuses: {
    createApplicationStatus: RequestStatus;
    getApplicationHistory: RequestStatus;
  };
};

const initialState: ProfileState = {
  isApplicationsInitializing: false,
  data: {
    applications: [],
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
        state.data.applications.push(action.payload);
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
        state.isApplicationsInitializing = true;
      },
      fulfilled: (state, action) => {
        state.statuses.getApplicationHistory.status = 'SUCCESS';
        state.statuses.getApplicationHistory.error = undefined;
        state.data.applications = action.payload;
        state.isApplicationsInitializing = true;
      },
    }),
  }),

  selectors: {
    selectStatuses: store => store.statuses,
    selectData: store => store.data,
    selectIsApplicationsInitializing: store => store.isApplicationsInitializing,
  },
});

export const selectApplicationState = (state: RootState) => state.application;

export const selectApplicationCompleted = (id: string) =>
  createSelector([selectApplicationState], state =>
    state.data.applications.find(el => el.id === id)
  );

export const applicationReduser = applicationSlice.reducer;

export const {
  createApplication: createApplicationApplication,
  getApplicationHistory: getApplicationHistoryApplication,
} = applicationSlice.actions;

export const {
  selectStatuses: selectStatusesApplication,
  selectData: selectDataApplication,
  selectIsApplicationsInitializing,
} = applicationSlice.selectors;
