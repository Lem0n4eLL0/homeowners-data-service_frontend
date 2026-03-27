import { RequestError, RequestStatus } from '@/api/apiTypes';
import { READY_REQUEST_STATUS } from '@/common/constants';
import { asyncThunkCreator, buildCreateSlice, createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { IndicationsHistory, Meter } from '@/common/commonTypes';
import { createMeters, getIndicationsHistory, getMeters, sendIndicationsHistory } from '@/api/api';

const createSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

type PropertyId = string;

type MetersState = {
  data: {
    meters: Record<PropertyId, Array<Meter>>;
    indicationsHistory: Array<IndicationsHistory>;
  };
  statuses: {
    getMetersStatus: RequestStatus;
    createMetersStatus: RequestStatus;
    getIndicationsHistoryStatus: RequestStatus;
    sendIndicationsStatus: RequestStatus;
  };
};

const initialState: MetersState = {
  data: {
    meters: {},
    indicationsHistory: [],
  },
  statuses: {
    getMetersStatus: READY_REQUEST_STATUS,
    createMetersStatus: READY_REQUEST_STATUS,
    getIndicationsHistoryStatus: READY_REQUEST_STATUS,
    sendIndicationsStatus: READY_REQUEST_STATUS,
  },
};

const metersSlice = createSlice({
  name: 'meters',
  initialState,
  reducers: create => ({
    getMeters: create.asyncThunk((id: PropertyId) => getMeters(id), {
      pending: state => {
        state.statuses.getMetersStatus.status = 'PENDING';
        state.statuses.getMetersStatus.error = undefined;
      },
      rejected: (state, action) => {
        state.statuses.getMetersStatus.status = 'ERROR';
        state.statuses.getMetersStatus.error = action.error as RequestError;
      },
      fulfilled: (state, action) => {
        state.statuses.getMetersStatus.status = 'SUCCESS';
        state.statuses.getMetersStatus.error = undefined;
        state.data.meters[action.meta.arg] = action.payload;
      },
    }),
    createMeters: create.asyncThunk(createMeters, {
      pending: state => {
        state.statuses.createMetersStatus.status = 'PENDING';
        state.statuses.createMetersStatus.error = undefined;
      },
      rejected: (state, action) => {
        state.statuses.createMetersStatus.status = 'ERROR';
        state.statuses.createMetersStatus.error = action.error as RequestError;
      },
      fulfilled: (state, action) => {
        state.statuses.createMetersStatus.status = 'SUCCESS';
        state.statuses.createMetersStatus.error = undefined;
        const data = state.data.meters[action.payload.propertyId] ?? [];
        state.data.meters[action.payload.propertyId] = [...data, action.payload];
      },
    }),
    getIndicationsHistory: create.asyncThunk(getIndicationsHistory, {
      pending: state => {
        state.statuses.getIndicationsHistoryStatus.status = 'PENDING';
        state.statuses.getIndicationsHistoryStatus.error = undefined;
      },
      rejected: (state, action) => {
        state.statuses.getIndicationsHistoryStatus.status = 'ERROR';
        state.statuses.getIndicationsHistoryStatus.error = action.error as RequestError;
      },
      fulfilled: (state, action) => {
        state.statuses.getIndicationsHistoryStatus.status = 'SUCCESS';
        state.statuses.getIndicationsHistoryStatus.error = undefined;
        state.data.indicationsHistory = action.payload;
      },
    }),
    sendIndicationsHistory: create.asyncThunk(sendIndicationsHistory, {
      pending: state => {
        state.statuses.sendIndicationsStatus.status = 'PENDING';
        state.statuses.sendIndicationsStatus.error = undefined;
      },
      rejected: (state, action) => {
        state.statuses.sendIndicationsStatus.status = 'ERROR';
        state.statuses.sendIndicationsStatus.error = action.error as RequestError;
      },
      fulfilled: (state, action) => {
        state.statuses.sendIndicationsStatus.status = 'SUCCESS';
        state.statuses.sendIndicationsStatus.error = undefined;
        state.data.indicationsHistory.push(action.payload);
      },
    }),
  }),

  selectors: {
    selectStatuses: store => store.statuses,
    selectData: store => store.data,
  },
});

export const selectMetersState = (state: RootState) => state.meters;

export const selectMeters = (id: PropertyId) =>
  createSelector([selectMetersState], state => state.data.meters[id]);

export const metersReduser = metersSlice.reducer;

export const {
  getMeters: getMetersMeters,
  createMeters: createMetersMeters,
  getIndicationsHistory: getIndicationsHistoryMeters,
  sendIndicationsHistory: sendIndicationsHistoryMeters,
} = metersSlice.actions;

export const { selectStatuses: selectStatusesMeters, selectData: selectDataMeters } =
  metersSlice.selectors;
