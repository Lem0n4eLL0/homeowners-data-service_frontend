import { selectIsProfileRegistered } from '@/services/slices/user';
import { useAppSelector } from '@/services/store';
import { Navigate, Outlet } from 'react-router';

interface IRegistrationProtector {
  isRedirectRegistration: boolean;
  redirectPath: string;
  replace?: boolean;
}

export const RegistrationProtector = (props: IRegistrationProtector) => {
  const { isRedirectRegistration, redirectPath, replace = true } = props;
  const isProfileRegistered = useAppSelector(selectIsProfileRegistered);

  if (isRedirectRegistration === isProfileRegistered) {
    return <Navigate to={redirectPath} replace={replace} />;
  }

  return <Outlet />;
};
