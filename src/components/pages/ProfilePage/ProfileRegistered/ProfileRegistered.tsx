import { PatchProfileRequest } from '@/api/apiTypes';
import { VALIDATORS } from '@/common/constants';
import useValidator, { ValidationScheme } from '@/hooks/useValidator';
import { selectStatusesUser, selectUser, updateProfileUser } from '@/services/slices/user';
import { useAppDispatch, useAppSelector } from '@/services/store';
import { SyntheticEvent, useMemo } from 'react';
import style from './ProfileRegistered.module.scss';
import commonStyle from '@styles/common.module.scss';
import { FormElement } from '@/components/forms/FormElement';
import { Input } from '@/components/forms/Input';
import { ErrorField } from '@/components/forms/ErrorField';
import { Button } from '@/components/Button';
import { PropertieList } from '@/components/PropertieList';
import { selectProfilePageState, setProfilePageState } from '@/services/slices/app';
import { useLocation } from 'react-router';
import { useEffect } from 'react';

const sendVerificationCodeFormScheme: ValidationScheme<PatchProfileRequest> = {
  lastName: VALIDATORS.LAST_NAME,
  firstName: VALIDATORS.FIRST_NAME,
  surname: VALIDATORS.SURNAME,
  email: VALIDATORS.EMAIL,
};

interface LocationState {
  emailVerified?: boolean;
}

export const ProfileRegistered = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const profileState = useAppSelector(selectProfilePageState);
  const { updateProfileStatus } = useAppSelector(selectStatusesUser);
  const { isValid, isChanged, errors, value, validate, updateField, toInitalValue } =
    useValidator<PatchProfileRequest>({
      initialValue: {
        firstName: user.firstName,
        lastName: user.lastName,
        surname: user.surname ?? '',
        email: user.email ?? '',
      },
      scheme: sendVerificationCodeFormScheme,
      validateIsToched: true,
      validateOnChange: true,
    });

  const updateProfileError = useMemo(
    () => ({
      isError: updateProfileStatus.status === 'ERROR',
      error: updateProfileStatus.error?.message,
    }),
    [updateProfileStatus.status]
  );

  const isUpdateProfileLoading = updateProfileStatus.status === 'PENDING';

  const updateFormHandler = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = validate(true);
    if (result[0]) {
      void dispatch(updateProfileUser(value));
    }
  };

  const activationFormHandler = () => {
    dispatch(setProfilePageState('UpdatingProfileInformation'));
  };

  const deactivationFormHandler = () => {
    dispatch(setProfilePageState('ProfileRegistered'));
    toInitalValue();
  };

  const isFormActive = profileState === 'UpdatingProfileInformation';

  /////////////// необходимо для подтверждения (вроде)
  const location = useLocation();

  const fetchUserProfile = async () => {
    try {
      const response = await fetch('https://api.brigada-kanbanov.ru/api/v1/accounts/profile', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      await response.json();
    } catch (error) {
      console.error('Ошибка загрузки профиля:', error);
    }
  };

  const state = location.state as LocationState | null;

  useEffect(() => {
    if (state?.emailVerified) {
      console.log('Почта подтверждена!');
      void fetchUserProfile();
    }
  }, [location.state]);
  /////////////////////

  return (
    <div className={style['content']}>
      <form
        name="update_profile"
        className={style['content__form-update']}
        onSubmit={e => void updateFormHandler(e)}
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
            disabled={!isFormActive || isUpdateProfileLoading}
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
            disabled={!isFormActive || isUpdateProfileLoading}
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
            disabled={!isFormActive || isUpdateProfileLoading}
          />
        </FormElement>
        <FormElement label="Почта" error={errors.email?.message}>
          <Input
            name="email"
            type="text"
            placeholder="Введите email"
            onChange={e => {
              void updateField('email', e.target.value);
            }}
            value={value.email}
            isError={!!errors.email?.message}
            extraClassName={commonStyle['form_field_base']}
            disabled={!isFormActive || isUpdateProfileLoading}
          />
        </FormElement>
        <div className={style['content__controls']}>
          {!isFormActive ? (
            <Button
              type="button"
              option={'BlueButton'}
              width="300px"
              onClick={activationFormHandler}
            >
              Изменить данные
            </Button>
          ) : (
            <>
              {updateProfileError.isError && <ErrorField>{updateProfileError.error}</ErrorField>}
              <div className={style['content__buttons']}>
                <Button
                  type="submit"
                  option={'BlueButton'}
                  width="300px"
                  disabled={!isValid || !isChanged}
                  loading={{ isLoading: isUpdateProfileLoading, loadingMessage: 'Сохранение...' }}
                >
                  Сохранить
                </Button>
                <Button
                  type="button"
                  option={'BlueInheritButton'}
                  width="300px"
                  onClick={deactivationFormHandler}
                  disabled={isUpdateProfileLoading}
                >
                  Отмена
                </Button>
              </div>
            </>
          )}
        </div>
      </form>
      <div className={style['content__propertie']}>
        <h2 className={style['propertie__title']}>Объекты недвижимости</h2>
        <PropertieList propertie={user.properties} disabled={isFormActive} />
      </div>
    </div>
  );
};
