import { selectStepState } from '@/services/slices/auth';
import { useAppSelector } from '@/services/store';
import { AuthStepOne } from '../AuthStepOne';
import { AuthStepTwo } from '../AuthStepTwo';

export const AuthFlow = () => {
  const stepAuthState = useAppSelector(selectStepState);

  return (
    <>
      {stepAuthState === 'AuthStepOne' && <AuthStepOne />}
      {stepAuthState === 'AuthStepTwo' && <AuthStepTwo />}
    </>
  );
};
