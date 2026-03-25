import { RequestError, RequestStatus } from '@/api/apiTypes';
import { READY_REQUEST_STATUS } from '@/common/constants';
import { asyncThunkCreator, buildCreateSlice, createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Accruals } from '@/common/commonTypes';
import { getAccruals } from '@/api/api';

const createSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

type ApplicationState = {
  data: {
    accruals: Array<Accruals>;
  };
  statuses: {
    getAccrualsStatus: RequestStatus;
  };
};

const initialState: ApplicationState = {
  data: {
    accruals: [],
  },
  statuses: {
    getAccrualsStatus: READY_REQUEST_STATUS,
  },
};

const accrualsSlice = createSlice({
  name: 'accruals',
  initialState,
  reducers: create => ({
    getAccruals: create.asyncThunk(getAccruals, {
      pending: state => {
        state.statuses.getAccrualsStatus.status = 'PENDING';
        state.statuses.getAccrualsStatus.error = undefined;
      },
      rejected: (state, action) => {
        state.statuses.getAccrualsStatus.status = 'ERROR';
        state.statuses.getAccrualsStatus.error = action.error as RequestError;
      },
      fulfilled: (state, action) => {
        state.statuses.getAccrualsStatus.status = 'SUCCESS';
        state.statuses.getAccrualsStatus.error = undefined;
        state.data.accruals = action.payload;
      },
    }),
  }),

  selectors: {
    selectStatuses: store => store.statuses,
    selectData: store => store.data,
  },
});

export const selectAccrualsState = (state: RootState) => state.accruals;

export const selectAccrual = (id: string) =>
  createSelector([selectAccrualsState], state => state.data.accruals.find(el => el.id === id));

export const accrualsReduser = accrualsSlice.reducer;

export const { getAccruals: getAccrualsAccruals } = accrualsSlice.actions;

export const { selectStatuses: selectStatusesAccruals, selectData: selectDataAccruals } =
  accrualsSlice.selectors;
