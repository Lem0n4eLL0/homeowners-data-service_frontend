import { useAppSelector } from '@/services/store';

import commonStyle from '@styles/common.module.scss';
import { selectProfileState } from '@/services/slices/profile';
import { ProfileNotRegistered } from '@/components/profile/ProfileNotRegistered';
import { ProfileRegistered } from '@/components/profile/ProfileRegistered';

export type ProfilePageStates =
  | 'ProfileNotRegistered'
  | 'ProfileRegistered'
  | 'UpdatingProfileInformation';

export const ProfilePage = () => {
  const profilePageState = useAppSelector(selectProfileState);
  // const isProfileRegistered = useAppSelector(selectIsProfileRegistered);
  // const {getProfileStatus} = useAppSelector(selectStatusesUser);

  // if (!isProfileRegistered) {
  //   return <Loader loaderClass={commonStyle['loader_bg']} />;
  // }

  return (
    <div className={commonStyle['base_page_wrapper']}>
      <h1 className={commonStyle['base_page_title']}>Профиль</h1>
      {profilePageState === 'ProfileNotRegistered' ? (
        <ProfileNotRegistered />
      ) : (
        <ProfileRegistered />
      )}
    </div>
  );
};
