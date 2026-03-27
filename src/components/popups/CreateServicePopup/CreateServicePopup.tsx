import { Button } from '@/components/Button';
import { ErrorField } from '@/components/forms/ErrorField';
import { FormElement } from '@/components/forms/FormElement';
import { useNavigate, useParams } from 'react-router';
import commonStyle from '@styles/common.module.scss';
import style from './CreateServicePopup.module.scss';
import clsx from 'clsx';
import { SyntheticEvent, useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/services/store';
import {
  clearErrorStatusesServices,
  createUserServicesServices,
  selectService,
  selectStatusesServices,
} from '@/services/slices/services';
import { InformationField } from '@/components/InformationField';
import useValidator, { ValidationScheme } from '@/hooks/useValidator';
import { Propertie } from '@/common/commonTypes';
import { emptyOption, VALIDATORS } from '@/common/constants';
import { AppSelect, OptionType } from '@/components/forms/AppSelect/AppSelect';
import { priceFormatter, properieFormatter } from '@/utils/utils';
import { selectUser } from '@/services/slices/user';
import { PriceSummary } from '@/components/PriceSummary';
import { Loader } from '@/components/shells/Loader';

type CreateServiceValidatedField = {
  address: Propertie | null;
};

const createServiceFormScheme: ValidationScheme<CreateServiceValidatedField> = {
  address: VALIDATORS.PROPERTY_ID,
};

export const CreateServicePopup = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const service = useAppSelector(selectService(id!));
  const { properties } = useAppSelector(selectUser);
  const { createUserServicesStatus } = useAppSelector(selectStatusesServices);
  const navigator = useNavigate();

  const { isValid, errors, value, validate, updateField } =
    useValidator<CreateServiceValidatedField>({
      initialValue: {
        address: null,
      },
      scheme: createServiceFormScheme,
      validateIsToched: true,
      validateOnChange: true,
    });

  useEffect(() => {
    return () => {
      dispatch(clearErrorStatusesServices());
    };
  }, [dispatch]);

  const createServiceHandler = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = validate(true);
    if (result[0]) {
      if (!value.address || !value.address.id) {
        throw new Error('Address is null');
      }
      const res = await dispatch(
        createUserServicesServices({
          propertyId: value.address?.id,
          serviceId: id!,
        })
      );
      if (res.meta.requestStatus === 'fulfilled') {
        void navigator(-1);
      }
    }
  };

  const propertyOptions = [
    emptyOption<Propertie>(),
    ...properties.map<OptionType<Propertie>>(el => ({
      value: el,
      label: properieFormatter(el),
    })),
  ];

  const createServiceError = useMemo(
    () => ({
      isError: createUserServicesStatus.status === 'ERROR',
      error: createUserServicesStatus.error?.message,
    }),
    [createUserServicesStatus.status]
  );

  const isLoading = createUserServicesStatus.status === 'PENDING';

  if (!service) {
    return (
      <div className={style['loader']}>
        <Loader loaderClass={clsx(commonStyle['loader'], commonStyle['loader_base_size'])} />
      </div>
    );
  }

  return (
    <div className={clsx(style['content'], commonStyle['content'])}>
      <h1 className={commonStyle['content__title']}>Заказать услугу</h1>
      <div
        className={clsx(
          style['content__block'],
          commonStyle['scroll'],
          createServiceError.isError && style['content__error']
        )}
      >
        <InformationField lable="Услуга">{service.title}</InformationField>
        <InformationField lable="Описание">{service.description}</InformationField>
        <form
          id="add_service_form"
          name="addServiceForm"
          onSubmit={e => void createServiceHandler(e)}
        >
          <FormElement label="Адрес" error={errors.address?.message} isRequired>
            <AppSelect
              value={
                value.address !== null
                  ? { value: value.address, label: properieFormatter(value.address) }
                  : null
              }
              options={propertyOptions}
              onChange={value => {
                updateField('address', value?.value ?? null);
              }}
              disabled={isLoading}
              placeholder={'Выберете адрес'}
              isError={!!errors.address?.message}
            ></AppSelect>
          </FormElement>
        </form>
        <PriceSummary price={priceFormatter(service.price)} />
      </div>
      <div className={clsx(commonStyle['content__controls'], style['content__controls'])}>
        {createServiceError.isError && <ErrorField>{createServiceError.error}</ErrorField>}
        <Button
          form="add_service_form"
          type="submit"
          option={'BlueButton'}
          disabled={!isValid}
          loading={{ isLoading: isLoading, loadingMessage: 'Формирование заказа...' }}
        >
          Заказать
        </Button>
      </div>
    </div>
  );
};
