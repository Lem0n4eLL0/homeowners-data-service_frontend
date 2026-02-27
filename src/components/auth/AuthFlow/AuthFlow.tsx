import { Time } from '../../../features/Timer/Time';
import useTimer from '../../../hooks/useTimer';
import {
  selectIsBlockedCodeMessage,
  selectStepState,
  setIsBlockedCodeMessage,
} from '../../../services/slices/auth';
import { useAppDispatch, useAppSelector } from '../../../services/store';
import { useEffect } from 'react';
import { AuthStepOne } from '../AuthStepOne';
import { AuthStepTwo } from '../AuthStepTwo';

const TIMER_SEND_CODE_MESSAGE_TIME_S = 60;

export const AuthFlow = () => {
  const dispatch = useAppDispatch();
  const stepAuthState = useAppSelector(selectStepState);
  const isBlockedCodeMessage = useAppSelector(selectIsBlockedCodeMessage);
  const { state, time, timer } = useTimer({ time: new Time(TIMER_SEND_CODE_MESSAGE_TIME_S) });

  useEffect(() => {
    if (state === 'Process') {
      if (!isBlockedCodeMessage) dispatch(setIsBlockedCodeMessage(true));
    } else {
      if (isBlockedCodeMessage) dispatch(setIsBlockedCodeMessage(false));
    }
  }, [dispatch, state, timer]);

  useEffect(() => {
    if (stepAuthState === 'AuthStepTwo' && !isBlockedCodeMessage) {
      timer.start();
    }
  }, [stepAuthState, timer]);

  return (
    <>
      {stepAuthState === 'AuthStepOne' && <AuthStepOne />}
      {stepAuthState === 'AuthStepTwo' && <AuthStepTwo time={time} />}
    </>
  );
};
