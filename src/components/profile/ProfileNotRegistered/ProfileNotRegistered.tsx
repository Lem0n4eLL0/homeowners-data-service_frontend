import { FormElement } from '@/components/forms/FormElement';
import style from './ProfileNotRegistered.module.scss';
import { Input } from '@/components/forms/Input';
import { useAppDispatch, useAppSelector } from '@/services/store';
import { registrationProfileUser, selectStatusesUser, selectUser } from '@/services/slices/user';
import { Button } from '@/components/Button';
import { SyntheticEvent, useMemo } from 'react';
import { ErrorField } from '@/components/forms/ErrorField';
import useValidator, { ValidationScheme } from '@/hooks/useValidator';
import { RegistrationProfileRequest } from '@/api/apiTypes';
import commonStyle from '@styles/common.module.scss';
import { personalAccountNumberFormatter } from '@/utils/utils';
import { VALIDATORS } from '@/common/constants';

const sendVerificationCodeFormScheme: ValidationScheme<RegistrationProfileRequest> = {
  lastName: VALIDATORS.LAST_NAME,
  firstName: VALIDATORS.FIRST_NAME,
  surname: VALIDATORS.SURNAME,
  street: VALIDATORS.STREET,
  houseNumber: VALIDATORS.HOUSE_NUMBER,
  corpus: VALIDATORS.CORPUS,
  flatNumber: VALIDATORS.FLAT_NUMBER,
  personalAccountNumber: VALIDATORS.PERSONAL_ACCOUNT_NUMBER,
  email: VALIDATORS.EMAIL,
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
        <FormElement label="Отчество" error={errors.surname?.message}>
          <Input
            name="surname"
            type="text"
            placeholder="Введите отчество"
            onChange={e => {
              void updateField('surname', e.target.value);
            }}
            value={value.surname}
            isError={!!errors.surname?.message}
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
          <FormElement label="Корпус" error={errors.corpus?.message}>
            <Input
              name="corpus"
              type="text"
              placeholder="Введите корпус"
              onChange={e => {
                void updateField('corpus', e.target.value);
              }}
              value={value.corpus}
              isError={!!errors.corpus?.message}
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
              void updateField(
                'personalAccountNumber',
                personalAccountNumberFormatter(e.target.value)
              );
            }}
            formatterFunc={personalAccountNumberFormatter}
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
