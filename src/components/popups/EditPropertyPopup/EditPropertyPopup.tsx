import { UpdatePropertieRequest } from '@/common/commonTypes';
import { VALIDATORS } from '@/common/constants';
import { Button } from '@/components/Button';
import { ErrorField } from '@/components/forms/ErrorField';
import { FormElement } from '@/components/forms/FormElement';
import { Input } from '@/components/forms/Input';
import useValidator, { ValidationScheme } from '@/hooks/useValidator';
import {
  resetErrorStatusesUser,
  selectPropertyCompleted,
  selectStatusesUser,
  updatePropertyUser,
} from '@/services/slices/user';
import { useAppDispatch, useAppSelector } from '@/services/store';
import { personalAccountNumberFormatter } from '@/utils/utils';
import clsx from 'clsx';
import { SyntheticEvent, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router';
import commonStyle from '@styles/common.module.scss';
import style from './EditPropertyPopup.module.scss';

const editVerificationCodeFormScheme: ValidationScheme<Omit<UpdatePropertieRequest, 'id'>> = {
  street: VALIDATORS.STREET,
  houseNumber: VALIDATORS.HOUSE_NUMBER,
  corpus: VALIDATORS.CORPUS,
  flatNumber: VALIDATORS.FLAT_NUMBER,
  personalAccountNumber: VALIDATORS.PERSONAL_ACCOUNT_NUMBER,
};

export const EditPropertyPopup = () => {
  const dispatch = useAppDispatch();
  const navigator = useNavigate();
  const { id } = useParams();
  const { updatePropertyStatus } = useAppSelector(selectStatusesUser);
  const property = useAppSelector(selectPropertyCompleted(id!));

  if (!property) {
    throw new Error(`По какой-то причине, ОН с id:'${id}' отсутствует в глобальном хранилище`);
  }

  const { isValid, errors, value, validate, updateField, isChanged } =
    useValidator<UpdatePropertieRequest>({
      initialValue: {
        id: property.id,
        street: property.street,
        houseNumber: property.houseNumber,
        corpus: property.corpus ?? '',
        flatNumber: property.flatNumber,
        personalAccountNumber: property.personalAccountNumber,
      },
      scheme: editVerificationCodeFormScheme,
      validateIsToched: true,
      validateOnChange: true,
    });

  const updatePropertyError = useMemo(
    () => ({
      isError: updatePropertyStatus.status === 'ERROR',
      error: updatePropertyStatus.error?.message,
    }),
    [updatePropertyStatus.status]
  );
  const isUpdatePropertyLoading = updatePropertyStatus.status === 'PENDING';

  const UpdatePropertyHandler = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = validate(true);
    if (result[0]) {
      const res = await dispatch(updatePropertyUser(value));
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
      <h1 className={commonStyle['content__title']}>Изменить объект недвижимости</h1>
      <form
        name="add_property"
        className={clsx(
          commonStyle['content__form'],
          updatePropertyError.isError && commonStyle['form__error']
        )}
        onSubmit={e => void UpdatePropertyHandler(e)}
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
              disabled={isUpdatePropertyLoading}
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
              disabled={isUpdatePropertyLoading}
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
              disabled={isUpdatePropertyLoading}
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
              disabled={isUpdatePropertyLoading}
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
              disabled={isUpdatePropertyLoading}
            />
          </FormElement>
        </div>

        <div className={commonStyle['content__controls']}>
          {updatePropertyError.isError && <ErrorField>{updatePropertyError.error}</ErrorField>}
          <div className={style['content__buttons']}>
            <Button
              type="submit"
              option={'BlueButton'}
              disabled={!isValid || !isChanged}
              loading={{ isLoading: isUpdatePropertyLoading, loadingMessage: 'Изменение...' }}
            >
              Изменить
            </Button>

            <Button
              type="button"
              option={'DeleteButton'}
              loading={{ isLoading: isUpdatePropertyLoading }}
            >
              Удалить
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
