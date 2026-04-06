import { FormElement } from '@/components/forms/FormElement';
import style from './ReadingsMeters.module.scss';
import commonStyle from '@styles/common.module.scss';
import { AppSelect } from '@/components/forms/AppSelect';
import { meterFormatter, properieFormatter } from '@/utils/utils';
import { OptionType } from '@/components/forms/AppSelect/AppSelect';
import { Meter, Propertie } from '@/common/commonTypes';
import { useAppDispatch, useAppSelector } from '@/services/store';
import { selectUser } from '@/services/slices/user';
import { SyntheticEvent, useEffect, useMemo, useState } from 'react';
import {
  getMetersMeters,
  selectMeters,
  selectStatusesMeters,
  sendIndicationsHistoryMeters,
} from '@/services/slices/meters';
import { VALIDATORS } from '@/common/constants';
import useValidator, { ValidationScheme } from '@/hooks/useValidator';
import { Input } from '@/components/forms/Input';
import { ErrorField } from '@/components/forms/ErrorField';
import { Button } from '@/components/Button';
import { MeterBlock } from '@/components/MeterBlock';
import clsx from 'clsx';
import { useLocation, useNavigate } from 'react-router';

type SendIndicationsScheme = {
  meter: Meter | null;
  value: string;
};
const sendIndicationsScheme: ValidationScheme<SendIndicationsScheme> = {
  meter: VALIDATORS.METER_ID,
  value: VALIDATORS.METER_VALUE,
};

export const ReadingsMeters = () => {
  const dispatch = useAppDispatch();
  const { properties } = useAppSelector(selectUser);
  const [selectedProperty, setSelectedPropertys] = useState<Propertie>(properties[0]);
  const meters = useAppSelector(selectMeters(selectedProperty.id));
  const { sendIndicationsStatus, getMetersStatus } = useAppSelector(selectStatusesMeters);
  const location = useLocation();
  const navigator = useNavigate();

  const isGetMetersPending =
    getMetersStatus.status === 'PENDING' || getMetersStatus.status === 'READY';
  useEffect(() => {
    if (!meters && getMetersStatus.status !== 'PENDING') {
      void dispatch(getMetersMeters(selectedProperty.id));
    }
  }, [meters, dispatch]);

  const { isValid, errors, value, validate, updateField } = useValidator<SendIndicationsScheme>({
    initialValue: {
      meter: null,
      value: '',
    },
    scheme: sendIndicationsScheme,
    validateIsToched: true,
    validateOnChange: true,
  });

  const propertyOptions = useMemo(
    () =>
      properties.map<OptionType<Propertie>>(el => ({
        value: el,
        label: properieFormatter(el),
      })),
    [properties]
  );

  const mettersOptions = useMemo(
    () =>
      meters
        ? meters.map<OptionType<Meter>>(el => ({
            value: el,
            label: meterFormatter(el),
          }))
        : [],
    [meters]
  );

  const requestError = useMemo(
    () => ({
      isError: sendIndicationsStatus.status === 'ERROR',
      error: sendIndicationsStatus.error?.message,
    }),
    [sendIndicationsStatus.status]
  );

  const isRequestPending = sendIndicationsStatus.status === 'PENDING';

  const sendIndicationHandler = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = validate(true);
    if (res[0]) {
      void dispatch(
        sendIndicationsHistoryMeters({
          meterId: value.meter!.id,
          value: +value.value,
        })
      );
    }
  };

  const createMeterhandler = () => {
    void navigator(`add/${selectedProperty.id}`, {
      state: {
        backgroundLocation: location,
      },
    });
  };

  return (
    <div className={style['content']}>
      <FormElement label="Адрес" extraClassName={style['content__address']}>
        <AppSelect
          options={propertyOptions}
          value={{ value: selectedProperty, label: properieFormatter(selectedProperty) }}
          onChange={value => setSelectedPropertys(value?.value ?? properties[0])}
          placeholder="Выберете адрес"
          disabled={isRequestPending}
        />
      </FormElement>
      <div className={style['content__meters']}>
        <FormElement label="Счетчики">
          {meters ? (
            <ul className={style['content__list']}>
              {meters.map(el => {
                return (
                  <li key={el.id} className={style['content__list_item']}>
                    <MeterBlock meter={el} className={style['content__meter']} />
                  </li>
                );
              })}
            </ul>
          ) : (
            <ul className={style['content__list']}>
              <li
                key={1}
                className={clsx(style['content__list_loader'], commonStyle['loader_bg'])}
              ></li>
              <li
                key={2}
                className={clsx(style['content__list_loader'], commonStyle['loader_bg'])}
              ></li>
              <li
                key={3}
                className={clsx(style['content__list_loader'], commonStyle['loader_bg'])}
              ></li>
            </ul>
          )}
        </FormElement>
        <Button
          type="button"
          option="BlueInheritButton"
          width={200}
          className={style['content__add_meter_button']}
          disabled={isGetMetersPending}
          onClick={createMeterhandler}
        >
          Добавить счетчик
        </Button>
      </div>

      <form
        name="send_indications_form"
        onSubmit={sendIndicationHandler}
        className={style['content__from']}
      >
        <div className={style['form__fields']}>
          <FormElement
            label="Выберете счетчик"
            error={errors.meter?.message}
            extraClassName={style['form__meter']}
          >
            <AppSelect
              options={mettersOptions}
              value={
                value.meter ? { value: value.meter, label: meterFormatter(value.meter) } : null
              }
              onChange={value => updateField('meter', value?.value ?? null)}
              isError={!!errors.meter?.message}
              disabled={isGetMetersPending || isRequestPending}
              placeholder="Выберете счетчик"
            />
          </FormElement>
          <FormElement
            label="Текущие показания"
            error={errors.value?.message}
            extraClassName={style['form__value']}
          >
            <Input
              name="meter_value"
              type="text"
              value={value.value}
              onChange={e => updateField('value', e.target.value)}
              placeholder="100.000"
              isError={!!errors.value?.message}
              disabled={isGetMetersPending || isRequestPending}
              extraClassName={commonStyle['form_field_base']}
            />
          </FormElement>
        </div>

        <div className={style['content__controls']}>
          {requestError.isError && <ErrorField>{requestError.error}</ErrorField>}
          <Button
            type="submit"
            option={'BlueButton'}
            width="300px"
            disabled={!isValid || isGetMetersPending}
            loading={{ isLoading: isRequestPending, loadingMessage: 'Передача показаний...' }}
          >
            Отправить
          </Button>
        </div>
      </form>
    </div>
  );
};
