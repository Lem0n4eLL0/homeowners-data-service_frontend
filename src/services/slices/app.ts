import { asyncThunkCreator, buildCreateSlice, PayloadAction } from '@reduxjs/toolkit';
import { getProfileUser, registrationProfileUser, updateProfileUser } from './user';

const createSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

export type ProfilePageStates =
  | 'ProfileNotRegistered'
  | 'ProfileRegistered'
  | 'UpdatingProfileInformation';

export type ApplicationsPageStates = 'ApplicationsPageCreate' | 'ApplicationsPageHistory';
export type ServicesPageStates = 'ServicesPageCreate' | 'ServicesPageHistory';
export type ReadingsPageStates = 'ReadingsPageMeters' | 'ReadingsPageHistory';

type ProfileState = {
  profilePageState: ProfilePageStates;
  applicationsPageState: ApplicationsPageStates;
  servicesPageState: ServicesPageStates;
  readingsPageStates: ReadingsPageStates;
};

const initialState: ProfileState = {
  profilePageState: 'ProfileNotRegistered',
  applicationsPageState: 'ApplicationsPageCreate',
  servicesPageState: 'ServicesPageCreate',
  readingsPageStates: 'ReadingsPageMeters',
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: create => ({
    setProfilePageState: create.reducer((state, action: PayloadAction<ProfilePageStates>) => {
      state.profilePageState = action.payload;
    }),
    setApplicationsPageState: create.reducer(
      (state, action: PayloadAction<ApplicationsPageStates>) => {
        state.applicationsPageState = action.payload;
      }
    ),
    setServicesPageState: create.reducer((state, action: PayloadAction<ServicesPageStates>) => {
      state.servicesPageState = action.payload;
    }),
    setReadingsPageState: create.reducer((state, action: PayloadAction<ReadingsPageStates>) => {
      state.readingsPageStates = action.payload;
    }),
  }),

  extraReducers: builder => {
    builder.addCase(getProfileUser.fulfilled, state => {
      state.profilePageState = 'ProfileRegistered';
    });
    builder.addCase(getProfileUser.rejected, state => {
      state.profilePageState = 'ProfileNotRegistered';
    });
    builder.addCase(registrationProfileUser.fulfilled, state => {
      state.profilePageState = 'ProfileRegistered';
    });
    builder.addCase(updateProfileUser.fulfilled, state => {
      state.profilePageState = 'ProfileRegistered';
    });
  },

  selectors: {
    selectProfilePageState: state => state.profilePageState,
    selectApplicationsPageState: state => state.applicationsPageState,
    selectServicesPageState: state => state.servicesPageState,
    selectReadingsPageState: state => state.readingsPageStates,
  },
});

export const appReduser = appSlice.reducer;

export const {
  setProfilePageState,
  setApplicationsPageState,
  setServicesPageState,
  setReadingsPageState,
} = appSlice.actions;

export const {
  selectProfilePageState,
  selectApplicationsPageState,
  selectServicesPageState,
  selectReadingsPageState,
} = appSlice.selectors;
