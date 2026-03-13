import { UpdatePropertieRequest } from '@/common/commonTypes';
import { VALIDATORS } from '@/common/constants';
import { Button } from '@/components/Button';
import { ErrorField } from '@/components/forms/ErrorField';
import { FormElement } from '@/components/forms/FormElement';
import { Input } from '@/components/forms/Input';
import useValidator, { ValidationScheme } from '@/hooks/useValidator';
import {
  deletePropertyUser,
  resetErrorStatusesUser,
  selectPropertyCompleted,
  selectStatusesUser,
  updatePropertyUser,
} from '@/services/slices/user';
import { useAppDispatch, useAppSelector } from '@/services/store';
import { personalAccountNumberFormatter } from '@/utils/utils';
import clsx from 'clsx';
import { SyntheticEvent, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
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
  const location = useLocation();
  const { id } = useParams();
  const { updatePropertyStatus, deletePropertyStatus } = useAppSelector(selectStatusesUser);
  const property = useAppSelector(selectPropertyCompleted(id!));
  const [isCanDeleteState, setIsCanDeleteState] = useState<boolean>(false);

  const { isValid, errors, value, validate, updateField, isChanged } =
    useValidator<UpdatePropertieRequest>({
      initialValue: {
        id: property?.id ?? '',
        street: property?.street ?? '',
        houseNumber: property?.houseNumber ?? '',
        corpus: property?.corpus ?? '',
        flatNumber: property?.flatNumber ?? '',
        personalAccountNumber: property?.personalAccountNumber ?? '',
      },
      scheme: editVerificationCodeFormScheme,
      validateIsToched: true,
      validateOnChange: true,
    });

  const propertyError = useMemo(
    () => ({
      isError: updatePropertyStatus.status === 'ERROR' || deletePropertyStatus.status === 'ERROR',
      error: updatePropertyStatus.error?.message ?? deletePropertyStatus.error?.message,
    }),
    [updatePropertyStatus.status, deletePropertyStatus.status]
  );
  const isPropertyLoading =
    updatePropertyStatus.status === 'PENDING' || deletePropertyStatus.status === 'PENDING';

  const UpdatePropertyHandler = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = validate(true);
    if (result[0]) {
      void dispatch(resetErrorStatusesUser());
      const res = await dispatch(updatePropertyUser(value));
      if (res.meta.requestStatus === 'fulfilled') {
        void navigator(-1);
      }
    }
  };

  const ChangeDeleteState = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsCanDeleteState(!isCanDeleteState);
  };

  const DeletePropertyHandler = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    void dispatch(resetErrorStatusesUser());
    const res = await dispatch(deletePropertyUser(id!));
    if (res.meta.requestStatus === 'fulfilled') {
      void navigator(-1);
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
      <div
        className={clsx(
          commonStyle['content__form'],
          propertyError.isError && commonStyle['form__error']
        )}
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
              disabled={isPropertyLoading}
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
              disabled={isPropertyLoading}
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
              disabled={isPropertyLoading}
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
              disabled={isPropertyLoading}
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
              disabled={isPropertyLoading}
            />
          </FormElement>
        </div>

        <div className={commonStyle['content__controls']}>
          {propertyError.isError && <ErrorField>{propertyError.error}</ErrorField>}
          <div className={style['content__buttons']}>
            <Button
              type="submit"
              option={'BlueButton'}
              form="auth_form_update_propery"
              disabled={!isValid || !isChanged || isPropertyLoading}
              loading={{
                isLoading: updatePropertyStatus.status === 'PENDING',
                loadingMessage: 'Изменение...',
              }}
            >
              Изменить
            </Button>
            {!isCanDeleteState ? (
              <Button
                type="button"
                option={'DeleteButton'}
                onClick={ChangeDeleteState}
                disabled={isPropertyLoading}
              >
                Удалить
              </Button>
            ) : (
              <Button
                type="submit"
                option={'DeleteButton'}
                form="auth_form_delete_propery"
                disabled={isPropertyLoading}
                loading={{
                  isLoading: deletePropertyStatus.status === 'PENDING',
                  loadingMessage: 'Удаление...',
                }}
              >
                Вы уверены?
              </Button>
            )}
          </div>
        </div>
      </div>
      <form
        id="auth_form_update_propery"
        name="auth_form_update_propery"
        className={commonStyle['hidden']}
        onSubmit={e => void UpdatePropertyHandler(e)}
      ></form>
      <form
        id="auth_form_delete_propery"
        name="auth_form_delete_propery"
        className={commonStyle['hidden']}
        onSubmit={e => void DeletePropertyHandler(e)}
      ></form>
    </div>
  );
};
