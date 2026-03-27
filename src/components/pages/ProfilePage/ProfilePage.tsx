import { useAppSelector } from '@/services/store';

import commonStyle from '@styles/common.module.scss';
import { selectProfilePageState } from '@/services/slices/app';
import { ProfileNotRegistered } from '@/components/pages/ProfilePage/ProfileNotRegistered';
import { ProfileRegistered } from '@/components/pages/ProfilePage/ProfileRegistered';

export type ProfilePageStates =
  | 'ProfileNotRegistered'
  | 'ProfileRegistered'
  | 'UpdatingProfileInformation';

export const ProfilePage = () => {
  const profilePageState = useAppSelector(selectProfilePageState);

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
