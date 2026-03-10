import { FormElement } from '@/components/forms/FormElement';
import style from './ProfileNotRegistered.module.scss';
import { Input } from '@/components/forms/Input';
import { useAppDispatch, useAppSelector } from '@/services/store';
import { registrationProfileUser, selectStatusesUser, selectUser } from '@/services/slices/user';
import { Button } from '@/components/Button';
import { SyntheticEvent, useMemo } from 'react';
import { ErrorField } from '@/components/forms/ErrorField';
import useValidator, { composeValidatorsOR, ValidationScheme } from '@/hooks/useValidator';
import { RegistrationProfileRequest } from '@/api/apiTypes';
import { EMAIL_REGEXP, PERSONAL_ACCOUT_NUMBER_REGEXP } from '@/common/constants';
import { isEmpty, likeRegExp, notNull } from '@/features/Validator/ValidationFunctions';
import commonStyle from '@styles/common.module.scss';

const sendVerificationCodeFormScheme: ValidationScheme<RegistrationProfileRequest> = {
  lastName: notNull(),
  firstName: notNull(),
  street: notNull(),
  houseNumber: notNull(),
  flatNumber: notNull(),
  personalAccountNumber: likeRegExp(
    PERSONAL_ACCOUT_NUMBER_REGEXP,
    'Номер лицевого счета должен состоять из 10 цифр'
  ),
  email: composeValidatorsOR(isEmpty(), likeRegExp(EMAIL_REGEXP, 'Неверный формат почты')),
};

export const ProfileNotRegistered = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const { registrationProfileStatus } = useAppSelector(selectStatusesUser);
  const { isValid, errors, value, validate, updateField } =
    useValidator<RegistrationProfileRequest>({
      initialValue: {
        firstName: user.firstName,
        lastName: user.lastName,
        surname: user.surname,
        street: '',
        houseNumber: '',
        corpus: '',
        flatNumber: '',
        email: user.email ?? '',
        personalAccountNumber: '',
      },
      scheme: sendVerificationCodeFormScheme,
      validateIsToched: true,
      validateOnChange: true,
    });

  const registrationProfileError = useMemo(
    () => ({
      isError: registrationProfileStatus.status === 'ERROR',
      error: registrationProfileStatus.error?.message,
    }),
    [registrationProfileStatus.status]
  );
  const isRegistrationProfileLoading = registrationProfileStatus.status === 'PENDING';

  const registrationFormHandler = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = validate(true);
    if (result[0]) {
      void dispatch(registrationProfileUser(value));
    }
  };

  return (
    <div className={style['content']}>
      <form
        name="registration_profile"
        className={style['content__form-registration']}
        onSubmit={e => void registrationFormHandler(e)}
      >
        <FormElement label="Фамилия" error={errors.lastName?.message} isRequired>
          <Input
            name="lastName"
            type="text"
            placeholder="Введите фамилию"
            onChange={e => {
              void updateField('lastName', e.target.value);
            }}
            value={value.lastName}
            isError={!!errors.lastName?.message}
            extraClassName={commonStyle['form_field_base']}
            disabled={isRegistrationProfileLoading}
          />
        </FormElement>
        <FormElement label="Имя" error={errors.firstName?.message} isRequired>
          <Input
            name="firstName"
            type="text"
            placeholder="Введите имя"
            onChange={e => {
              void updateField('firstName', e.target.value);
            }}
            value={value.firstName}
            isError={!!errors.firstName?.message}
            extraClassName={commonStyle['form_field_base']}
            disabled={isRegistrationProfileLoading}
          />
        </FormElement>
        <FormElement label="Отчество">
          <Input
            name="surname"
            type="text"
            placeholder="Введите отчество"
            onChange={e => {
              void updateField('surname', e.target.value);
            }}
            value={value.surname}
            extraClassName={commonStyle['form_field_base']}
            disabled={isRegistrationProfileLoading}
          />
        </FormElement>
        <div className={style['content__address']}>
          <FormElement
            label="Улица"
            extraClassName={style['content__address_street']}
            error={errors.street?.message}
            isRequired
          >
            <Input
              name="street"
              type="text"
              placeholder="Введите улицу"
              onChange={e => {
                void updateField('street', e.target.value);
              }}
              value={value.street}
              isError={!!errors.street?.message}
              extraClassName={commonStyle['form_field_base']}
              disabled={isRegistrationProfileLoading}
            />
          </FormElement>
          <FormElement label="Дом" error={errors.houseNumber?.message} isRequired>
            <Input
              name="houseNumber"
              type="text"
              placeholder="Введите дом"
              onChange={e => {
                void updateField('houseNumber', e.target.value);
              }}
              value={value.houseNumber}
              isError={!!errors.houseNumber?.message}
              extraClassName={commonStyle['form_field_base']}
              disabled={isRegistrationProfileLoading}
            />
          </FormElement>
          <FormElement label="Корпус">
            <Input
              name="corpus"
              type="text"
              placeholder="Введите корпус"
              onChange={e => {
                void updateField('corpus', e.target.value);
              }}
              value={value.corpus}
              extraClassName={commonStyle['form_field_base']}
              disabled={isRegistrationProfileLoading}
            />
          </FormElement>
          <FormElement label="Квартира" error={errors.flatNumber?.message} isRequired>
            <Input
              name="flatNumber"
              type="text"
              placeholder="Введите квартиру"
              onChange={e => {
                void updateField('flatNumber', e.target.value);
              }}
              value={value.flatNumber}
              isError={!!errors.flatNumber?.message}
              extraClassName={commonStyle['form_field_base']}
              disabled={isRegistrationProfileLoading}
            />
          </FormElement>
        </div>
        <FormElement
          label="№ Лицевого счета"
          error={errors.personalAccountNumber?.message}
          isRequired
        >
          <Input
            name="personalAccountNumber"
            type="text"
            placeholder="Введите номер счета"
            onChange={e => {
              void updateField('personalAccountNumber', e.target.value);
            }}
            value={value.personalAccountNumber}
            isError={!!errors.personalAccountNumber?.message}
            extraClassName={commonStyle['form_field_base']}
            disabled={isRegistrationProfileLoading}
          />
        </FormElement>
        <FormElement label="Почта" error={errors.email?.message}>
          <Input
            name="email"
            type="text"
            placeholder="Введите почту"
            onChange={e => {
              void updateField('email', e.target.value);
            }}
            value={value.email}
            isError={!!errors.email?.message}
            extraClassName={commonStyle['form_field_base']}
            disabled={isRegistrationProfileLoading}
          />
        </FormElement>
        <div className={style['content__controls']}>
          {registrationProfileError.isError && (
            <ErrorField>{registrationProfileError.error}</ErrorField>
          )}
          <Button
            type="submit"
            option={'BlueButton'}
            width="300px"
            disabled={!isValid}
            loading={{ isLoading: isRegistrationProfileLoading, loadingMessage: 'Регистрация...' }}
          >
            Зарегистрироваться
          </Button>
        </div>
      </form>
    </div>
  );
};
