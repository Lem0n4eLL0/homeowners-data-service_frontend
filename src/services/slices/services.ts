import { asyncThunkCreator, buildCreateSlice, createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Services, UserServices, UserServicesFull } from '@/common/commonTypes';
import { RequestError, RequestStatus } from '@/api/apiTypes';
import { READY_REQUEST_STATUS } from '@/common/constants';
import {
  getServices as getServicesRequest,
  createUserServices as createUserServicesRequest,
  getUserServices,
} from '@api/api';

const createSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

export const convertToFullServices = (
  userService: UserServices,
  services: Services[]
): UserServicesFull => {
  const fullService = services.find(s => s.id === userService.serviceId);
  if (!fullService) {
    throw new Error(`Service with id ${userService.serviceId} not found`);
  }
  const { serviceId, ...rest } = userService;
  return {
    ...rest,
    service: fullService,
  };
};

type ServicesState = {
  data: {
    services: Array<Services>;
    servicesHistory: Array<UserServicesFull>;
  };
  statuses: {
    createUserServicesStatus: RequestStatus;
    getServicesStatus: RequestStatus;
    getServicesHistory: RequestStatus;
  };
};

const initialState: ServicesState = {
  data: {
    services: [],
    servicesHistory: [],
  },
  statuses: {
    createUserServicesStatus: READY_REQUEST_STATUS,
    getServicesStatus: READY_REQUEST_STATUS,
    getServicesHistory: READY_REQUEST_STATUS,
  },
};

const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: create => ({
    createUserServices: create.asyncThunk(createUserServicesRequest, {
      pending: state => {
        state.statuses.createUserServicesStatus.status = 'PENDING';
        state.statuses.createUserServicesStatus.error = undefined;
      },
      rejected: (state, action) => {
        state.statuses.createUserServicesStatus.status = 'ERROR';
        state.statuses.createUserServicesStatus.error = action.error as RequestError;
      },
      fulfilled: (state, action) => {
        state.statuses.createUserServicesStatus.status = 'SUCCESS';
        state.statuses.createUserServicesStatus.error = undefined;
        try {
          state.data.servicesHistory.push(
            convertToFullServices(action.payload, state.data.services)
          );
        } catch (e) {
          state.statuses.createUserServicesStatus.status = 'ERROR';
          state.statuses.createUserServicesStatus.error = {
            message: e instanceof Error ? e.message : 'Failed to convert service',
          } as RequestError;
        }
      },
    }),

    getServices: create.asyncThunk(getServicesRequest, {
      pending: state => {
        state.statuses.getServicesStatus.status = 'PENDING';
        state.statuses.getServicesStatus.error = undefined;
      },
      rejected: (state, action) => {
        state.statuses.getServicesStatus.status = 'ERROR';
        state.statuses.getServicesStatus.error = action.error as RequestError;
      },
      fulfilled: (state, action) => {
        state.statuses.getServicesStatus.status = 'SUCCESS';
        state.statuses.getServicesStatus.error = undefined;
        state.data.services = action.payload;
      },
    }),

    getServicesHistory: create.asyncThunk(getUserServices, {
      pending: state => {
        state.statuses.getServicesHistory.status = 'PENDING';
        state.statuses.getServicesHistory.error = undefined;
      },
      rejected: (state, action) => {
        state.statuses.getServicesHistory.status = 'ERROR';
        state.statuses.getServicesHistory.error = action.error as RequestError;
      },
      fulfilled: (state, action) => {
        state.statuses.getServicesHistory.status = 'SUCCESS';
        state.statuses.getServicesHistory.error = undefined;
        const serviceHistory = [];
        for (const service of action.payload) {
          try {
            serviceHistory.push(convertToFullServices(service, state.data.services));
          } catch (e) {
            state.statuses.createUserServicesStatus.status = 'ERROR';
            state.statuses.createUserServicesStatus.error = {
              message: e instanceof Error ? e.message : 'Failed to convert service',
            } as RequestError;
          }
        }
        state.data.servicesHistory = serviceHistory;
      },
    }),

    clearErrorStatuses: create.reducer(state => {
      if (state.statuses.createUserServicesStatus.status === 'ERROR')
        state.statuses.createUserServicesStatus = READY_REQUEST_STATUS;
      if (state.statuses.getServicesHistory.status === 'ERROR')
        state.statuses.getServicesHistory = READY_REQUEST_STATUS;
      if (state.statuses.getServicesStatus.status === 'ERROR')
        state.statuses.getServicesStatus = READY_REQUEST_STATUS;
    }),
  }),

  selectors: {
    selectStatuses: store => store.statuses,
    selectData: store => store.data,
  },
});

export const selectServicesState = (state: RootState) => state.services;

export const selectService = (id: string) =>
  createSelector([selectServicesState], state => state.data.services.find(el => el.id === id));

export const selectUserService = (id: string) =>
  createSelector([selectServicesState], state =>
    state.data.servicesHistory.find(el => el.id === id)
  );

export const servicesReduser = servicesSlice.reducer;

export const {
  createUserServices: createUserServicesServices,
  getServices: getServicesServices,
  getServicesHistory: getServicesHistoryServices,
  clearErrorStatuses: clearErrorStatusesServices,
} = servicesSlice.actions;

export const { selectStatuses: selectStatusesServices, selectData: selectDataServices } =
  servicesSlice.selectors;
