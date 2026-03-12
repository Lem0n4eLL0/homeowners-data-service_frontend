import { PatchProfileRequest } from '@/api/apiTypes';
import { EMAIL_REGEXP } from '@/common/constants';
import { isEmpty, likeRegExp, notNull } from '@/features/Validator/ValidationFunctions';
import useValidator, { composeValidatorsOR, ValidationScheme } from '@/hooks/useValidator';
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
import { selectProfileState, setProfileState } from '@/services/slices/profile';

const sendVerificationCodeFormScheme: ValidationScheme<PatchProfileRequest> = {
  lastName: notNull(),
  firstName: notNull(),
  email: composeValidatorsOR(isEmpty(), likeRegExp(EMAIL_REGEXP, 'Неверный формат почты')),
};

export const ProfileRegistered = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const profileState = useAppSelector(selectProfileState);
  const { updateProfileStatus } = useAppSelector(selectStatusesUser);
  const { isValid, isChanged, errors, value, validate, updateField, toInitalValue } =
    useValidator<PatchProfileRequest>({
      initialValue: {
        firstName: user.firstName,
        lastName: user.lastName,
        surname: user.surname ?? '-',
        email: user.email ?? '-',
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
    dispatch(setProfileState('UpdatingProfileInformation'));
  };

  const deactivationFormHandler = () => {
    dispatch(setProfileState('ProfileRegistered'));
    toInitalValue();
  };

  const onClickPropertieHandler = (id: string) => {
    console.log(id);
  };

  const isFormActive = profileState === 'UpdatingProfileInformation';

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
                  disabled={!isChanged}
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
      <FormElement label="Объекты недвижимости" extraClassName={style['content__propertie']}>
        <PropertieList
          propertie={user.properties}
          disabled={isFormActive}
          onElementClick={onClickPropertieHandler}
        />
      </FormElement>
    </div>
  );
};
