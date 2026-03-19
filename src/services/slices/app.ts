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

type ProfileState = {
  profilePageState: ProfilePageStates;
  applicationsPageState: ApplicationsPageStates;
};

const initialState: ProfileState = {
  profilePageState: 'ProfileNotRegistered',
  applicationsPageState: 'ApplicationsPageCreate',
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
  },
});

export const appReduser = appSlice.reducer;

export const { setProfilePageState, setApplicationsPageState } = appSlice.actions;

export const { selectProfilePageState, selectApplicationsPageState } = appSlice.selectors;
