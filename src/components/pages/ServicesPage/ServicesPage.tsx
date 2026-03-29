import { useAppDispatch } from '@/services/store';
import { ReactNode, useEffect } from 'react';
import { getServicesServices } from '@/services/slices/services';

type IServicesPage = {
  children: ReactNode;
};

export const ServicesPage = (props: IServicesPage) => {
  const { children } = props;
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(getServicesServices());
  }, [dispatch]);

  return children;
};
