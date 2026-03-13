import { FormElement } from '@/components/forms/FormElement';
import commonStyle from '@styles/common.module.scss';
import useValidator, { ValidationScheme } from '@/hooks/useValidator';
import { VALIDATORS } from '@/common/constants';
import { Propertie } from '@/common/commonTypes';
import { Input } from '@/components/forms/Input';
import { useAppDispatch, useAppSelector } from '@/services/store';
import {
  createProperyUser,
  resetErrorStatusesUser,
  selectStatusesUser,
} from '@/services/slices/user';
import { Button } from '@/components/Button';
import { SyntheticEvent, useEffect, useMemo } from 'react';
import { ErrorField } from '@/components/forms/ErrorField';
import clsx from 'clsx';
import { useNavigate } from 'react-router';
import { personalAccountNumberFormatter } from '@/utils/utils';

const sendVerificationCodeFormScheme: ValidationScheme<Propertie> = {
  street: VALIDATORS.STREET,
  houseNumber: VALIDATORS.HOUSE_NUMBER,
  corpus: VALIDATORS.CORPUS,
  flatNumber: VALIDATORS.FLAT_NUMBER,
  personalAccountNumber: VALIDATORS.PERSONAL_ACCOUNT_NUMBER,
};

export const AddPropertyPopup = () => {
  const dispatch = useAppDispatch();
  const { createPropertyStatus } = useAppSelector(selectStatusesUser);
  const navigator = useNavigate();
  const { isValid, errors, value, validate, updateField } = useValidator<Omit<Propertie, 'id'>>({
    initialValue: {
      street: '',
      houseNumber: '',
      corpus: '',
      flatNumber: '',
      personalAccountNumber: '',
    },
    scheme: sendVerificationCodeFormScheme,
    validateIsToched: true,
    validateOnChange: true,
  });

  const createPropertyError = useMemo(
    () => ({
      isError: createPropertyStatus.status === 'ERROR',
      error: createPropertyStatus.error?.message,
    }),
    [createPropertyStatus.status]
  );
  const isCreatePropertyLoading = createPropertyStatus.status === 'PENDING';

  const CreatePropertyHandler = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = validate(true);
    if (result[0]) {
      const res = await dispatch(createProperyUser(value));
      if (res.meta.requestStatus === 'fulfilled') {
        void navigator(-1);
      }
    }
  };

  useEffect(() => {
    return () => {
      void dispatch(resetErrorStatusesUser());
    };
  }, []);

  return (
    <div className={clsx(commonStyle['content'], commonStyle['scroll'])}>
      <h1 className={commonStyle['content__title']}>Добавить объект недвижимости</h1>
      <form
        name="add_property"
        className={clsx(
          commonStyle['content__form'],
          createPropertyError.isError && commonStyle['form__error']
        )}
        onSubmit={e => void CreatePropertyHandler(e)}
      >
        <div className={clsx(commonStyle['content__fields'], commonStyle['scroll'])}>
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
              disabled={isCreatePropertyLoading}
            />
          </FormElement>
          <FormElement label="Улица" error={errors.street?.message} isRequired>
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
              disabled={isCreatePropertyLoading}
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
              disabled={isCreatePropertyLoading}
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
              disabled={isCreatePropertyLoading}
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
              disabled={isCreatePropertyLoading}
            />
          </FormElement>
        </div>

        <div className={commonStyle['content__controls']}>
          {createPropertyError.isError && <ErrorField>{createPropertyError.error}</ErrorField>}
          <Button
            type="submit"
            option={'BlueButton'}
            disabled={!isValid}
            loading={{ isLoading: isCreatePropertyLoading, loadingMessage: 'Добавление...' }}
          >
            Добавить
          </Button>
        </div>
      </form>
    </div>
  );
};
