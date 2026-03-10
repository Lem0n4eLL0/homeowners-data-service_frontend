import { selectUser } from '@/services/slices/user';
import { useAppSelector } from '@/services/store';

export const ProfileRegistered = () => {
  const user = useAppSelector(selectUser);
  return <div>{user.firstName}</div>;
};
