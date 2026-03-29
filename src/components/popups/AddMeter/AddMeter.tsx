import clsx from 'clsx';
import style from './AddMeter.module.scss';
import commonStyle from '@styles/common.module.scss';
import { SyntheticEvent, useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/services/store';
import { useNavigate } from 'react-router';
import useValidator, { ValidationScheme } from '@/hooks/useValidator';
import {
  emptyOption,
  FilteredMeterType,
  TYPE_METER_BASE_OPTIONS,
  VALIDATORS,
} from '@/common/constants';
import {
  createMetersMeters,
  resetCreateMetersStatus,
  selectStatusesMeters,
} from '@/services/slices/meters';
import { MeterType } from '@/common/commonTypes';
import { FormElement } from '@/components/forms/FormElement';
import { AppSelect } from '@/components/forms/AppSelect';
import { Input } from '@/components/forms/Input';
import { Button } from '@/components/Button';
import { ErrorField } from '@/components/forms/ErrorField';
import { meterTypeFormatter } from '@/utils/utils';

type CreateMeterScheme = {
  type: MeterType | null;
  serialNumber: string;
};

const sendVerificationCodeFormScheme: ValidationScheme<CreateMeterScheme> = {
  type: VALIDATORS.METER_TYPE,
  serialNumber: VALIDATORS.METER_SERIAL_NUMBER,
};

export const AddMeter = () => {
  const dispatch = useAppDispatch();
  const { createMetersStatus } = useAppSelector(selectStatusesMeters);
  const navigator = useNavigate();

  useEffect(() => {
    return () => {
      dispatch(resetCreateMetersStatus());
    };
  }, [dispatch]);

  const { isValid, errors, value, validate, updateField } = useValidator<CreateMeterScheme>({
    initialValue: {
      type: null,
      serialNumber: '',
    },
    scheme: sendVerificationCodeFormScheme,
    validateIsToched: true,
    validateOnChange: true,
  });

  const requestError = useMemo(
    () => ({
      isError: createMetersStatus.status === 'ERROR',
      error: createMetersStatus.error?.message,
    }),
    [createMetersStatus.status]
  );
  const isRequestPending = createMetersStatus.status === 'PENDING';

  const meterTypesOptions = [emptyOption<FilteredMeterType>(), ...TYPE_METER_BASE_OPTIONS];

  const addMeterHandler = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = validate(true);
    if (res[0]) {
      const res = await dispatch(
        createMetersMeters({
          type: value.type!,
          serialNumber: value.serialNumber,
        })
      );
      if (res.meta.requestStatus === 'fulfilled') {
        void navigator(-1);
      }
    }
  };

  return (
    <div className={clsx(style['content'], commonStyle['content'])}>
      <h1 className={commonStyle['content__title']}>Добавить счетчик</h1>
      <form
        name="add_property"
        className={clsx(style['content__form'], requestError.isError && commonStyle['form__error'])}
        onSubmit={e => void addMeterHandler(e)}
      >
        <div className={clsx(commonStyle['content__fields'], commonStyle['scroll'])}>
          <FormElement label="Тип счетчика" error={errors.type?.message} isRequired>
            <AppSelect
              options={meterTypesOptions}
              value={
                value.type
                  ? {
                      value: { id: value.type, type: value.type },
                      label: meterTypeFormatter(value.type),
                    }
                  : null
              }
              onChange={el => updateField('type', el?.value?.type ?? null)}
              placeholder="Выберете адрес"
              isError={!!errors.type?.message}
              disabled={isRequestPending}
            />
          </FormElement>
          <FormElement label="Номер счетчика" error={errors.serialNumber?.message} isRequired>
            <Input
              name="serialNumber"
              type="text"
              placeholder="Номер счетчика"
              onChange={e => {
                void updateField('serialNumber', e.target.value);
              }}
              value={value.serialNumber}
              isError={!!errors.serialNumber?.message}
              extraClassName={commonStyle['form_field_base']}
              disabled={isRequestPending}
            />
          </FormElement>
        </div>
        <div className={commonStyle['content__controls']}>
          {requestError.isError && <ErrorField>{requestError.error}</ErrorField>}
          <Button
            type="submit"
            option={'BlueButton'}
            disabled={!isValid}
            loading={{ isLoading: isRequestPending, loadingMessage: 'Добавление...' }}
          >
            Добавить
          </Button>
        </div>
      </form>
    </div>
  );
};
