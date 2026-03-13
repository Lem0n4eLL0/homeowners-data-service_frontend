import { asyncThunkCreator, buildCreateSlice, PayloadAction } from '@reduxjs/toolkit';
import { getProfileUser, registrationProfileUser, updateProfileUser } from './user';

const createSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

export type ProfilePageStates =
  | 'ProfileNotRegistered'
  | 'ProfileRegistered'
  | 'UpdatingProfileInformation';

type ProfileState = {
  pageState: ProfilePageStates;
};

const initialState: ProfileState = {
  pageState: 'ProfileNotRegistered',
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: create => ({
    setProfileState: create.reducer((state, action: PayloadAction<ProfilePageStates>) => {
      state.pageState = action.payload;
    }),
  }),

  extraReducers: builder => {
    builder.addCase(getProfileUser.fulfilled, state => {
      state.pageState = 'ProfileRegistered';
    });
    builder.addCase(getProfileUser.rejected, state => {
      state.pageState = 'ProfileNotRegistered';
    });
    builder.addCase(registrationProfileUser.fulfilled, state => {
      state.pageState = 'ProfileRegistered';
    });
    builder.addCase(updateProfileUser.fulfilled, state => {
      state.pageState = 'ProfileRegistered';
    });
  },

  selectors: {
    selectProfileState: state => state.pageState,
  },
});

export const profileReduser = profileSlice.reducer;

export const { setProfileState } = profileSlice.actions;

export const { selectProfileState } = profileSlice.selectors;
