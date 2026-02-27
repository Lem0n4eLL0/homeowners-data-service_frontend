import { Input } from '@/components/Input';
import style from './AuthStepTwo.module.scss';
import commonStyle from '@styles/common.module.scss';
import { FormElement } from '@/components/FormElement';
import { Timer } from '../../../components/Timer';
import { Time } from '../../../features/Timer/Time';
import { Button } from '@/components/Button';
import { useAppDispatch, useAppSelector } from '../../../services/store';
import { selectIsBlockedCodeMessage, setStepState } from '../../../services/slices/auth';

interface IAuthStepTwo {
  time: Time;
}

export const AuthStepTwo = (props: IAuthStepTwo) => {
  const { time } = props;
  const dispatch = useAppDispatch();
  const isBlockedCodeMessage = useAppSelector(selectIsBlockedCodeMessage);

  const changePhoneNumber = () => {
    dispatch(setStepState('AuthStepOne'));
  };

  const phone = '+7 902 555 24 67';
  return (
    <div className={style['content']}>
      <div className={style['content__info']}>
        <span className={style['content__description']}>
          Пожалуйста, введите одноразовый пароль отправленный на номер {phone}
        </span>
        <Button
          type="button"
          className={style['content__change-phone-button']}
          option="LinkButton"
          onClick={changePhoneNumber}
        >
          Поменять номер
        </Button>
      </div>

      <form name="auth_form_step_2" className={style['form_verification_code']}>
        <FormElement extraClassName={style['form__password_input']}>
          <Input type="text" placeholder="Одноразовый пароль" />
        </FormElement>
        <div className={style['form__send_code_wrapper']}>
          {isBlockedCodeMessage ? (
            <Timer value={time} accuracy={'minuts'} extraClassName={style['content__timer']} />
          ) : (
            <Button
              type="submit"
              option="LinkButton"
              name="send_again_code_message_button"
              className={style['content__send-code-button']}
            >
              Повторно отправить пароль
            </Button>
          )}
        </div>
        <Button type="submit" option="BlueButton">
          Войти
        </Button>
      </form>
      <div className={style['content__agreement']}>
        <FormElement extraClassName={style['agreement__checkbox']}>
          <Input type="checkbox" name="agreement" />
        </FormElement>
        <span className={style['agreement__description']}>
          Я согласен c{' '}
          <a href="##" className={commonStyle['base_link']}>
            Пользовательским соглашением
          </a>{' '}
          и{' '}
          <a href="##" className={commonStyle['base_link']}>
            Политикой обработки персональных данных.
          </a>
        </span>
      </div>
    </div>
  );
};
