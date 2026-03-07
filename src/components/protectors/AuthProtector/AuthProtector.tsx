import { selectIsAuthCompleted } from '@/services/slices/auth';
import { useAppSelector } from '@/services/store';
import { Navigate, Outlet } from 'react-router';

interface IAuthProtector {
  isRedirectAuthorized: boolean;
  redirectPath: string;
  replace?: boolean;
}

export const AuthProtector = (props: IAuthProtector) => {
  const { isRedirectAuthorized, redirectPath, replace = true } = props;
  const isCompleted = useAppSelector(selectIsAuthCompleted);

  if (isRedirectAuthorized === isCompleted) {
    return <Navigate to={redirectPath} replace={replace} />;
  }

  return <Outlet />;
};
