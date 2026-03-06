import { selectIsAuthCompleted } from '@/services/slices/auth';
import { useAppSelector } from '@/services/store';
import { useEffect, useMemo } from 'react';
import { Outlet, useNavigate } from 'react-router';

interface IAuthProtector {
  isRedirectAuthorized: boolean;
  redirectPath: string;
  replace?: boolean;
}

export const AuthProtector = (props: IAuthProtector) => {
  const { isRedirectAuthorized, redirectPath, replace = true } = props;
  const isCompeted = useAppSelector(selectIsAuthCompleted);
  const navigator = useNavigate();

  const isRedirect = useMemo(
    () => isRedirectAuthorized === isCompeted,
    [isRedirectAuthorized, isCompeted]
  );

  useEffect(() => {
    if (isRedirect) {
      void navigator(redirectPath, { replace });
    }
  }, [navigator, isRedirect, replace]);

  return <Outlet />;
};
