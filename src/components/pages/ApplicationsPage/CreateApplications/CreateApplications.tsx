import { FormElement } from '@/components/forms/FormElement';
import style from './CreateApplications.module.scss';
import useValidator, { ValidationScheme } from '@/hooks/useValidator';
import { VALIDATORS } from '@/common/constants';
import { SyntheticEvent, useMemo } from 'react';
import { Input } from '@/components/forms/Input';
import { useAppDispatch, useAppSelector } from '@/services/store';
import { selectUser } from '@/services/slices/user';
import { Button } from '@/components/Button';
import {
  createApplicationApplication,
  selectStatusesApplication,
} from '@/services/slices/applications';
import { AppSelect } from '@/components/forms/AppSelect';
import { Propertie } from '@/common/commonTypes';
import { OptionType } from '@/components/forms/AppSelect/AppSelect';
import { properieFormatter, textareaFormatter } from '@/utils/utils';
import { Textarea } from '@/components/forms/Textarea/Textarea';
import { ErrorField } from '@/components/forms/ErrorField';

type CreateApplicationsForm = {
  property: Propertie | null;
  title: string;
  message: string;
};

const sendVerificationCodeFormScheme: ValidationScheme<CreateApplicationsForm> = {
  property: VALIDATORS.PROPERTY_ID,
  title: VALIDATORS.APPLICATIONS.TITLE,
  message: VALIDATORS.APPLICATIONS.MESSAGE,
};

export const CreateApplications = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const { createApplicationStatus } = useAppSelector(selectStatusesApplication);

  const { isValid, isChanged, errors, value, validate, updateField, toInitalValue } =
    useValidator<CreateApplicationsForm>({
      initialValue: {
        property: null,
        title: '',
        message: '',
      },
      scheme: sendVerificationCodeFormScheme,
      validateIsToched: true,
      validateOnChange: true,
    });

  const createApplicationError = useMemo(
    () => ({
      isError: createApplicationStatus.status === 'ERROR',
      error: createApplicationStatus.error?.message,
    }),
    [createApplicationStatus.status]
  );
  const isCreateApplicationLoading = createApplicationStatus.status === 'PENDING';

  const createApplicationsFormHandler = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = validate(true);
    if (result[0]) {
      void dispatch(
        createApplicationApplication({
          propertyId: value.property!.id,
          title: value.title,
          message: value.message,
        })
      );
    }
  };

  const propertyOptions = user.properties.map<OptionType<Propertie>>(el => ({
    value: el,
    label: properieFormatter(el),
  }));

  return (
    <div className={style['content']}>
      <form
        name="update_profile"
        className={style['content__form']}
        onSubmit={e => void createApplicationsFormHandler(e)}
      >
        <FormElement label="Адрес" error={errors.property?.message} isRequired>
          <AppSelect
            options={propertyOptions}
            value={
              value.property !== null
                ? { value: value.property, label: properieFormatter(value.property) }
                : null
            }
            onChange={value => {
              updateField('property', value?.value ?? null);
            }}
            isError={!!errors.property?.message}
            placeholder="Выберете адрес"
            disabled={isCreateApplicationLoading}
          />
        </FormElement>
        <div className={style['form__description']}>
          <FormElement
            label="Обращение"
            error={errors.title?.message}
            extraClassName={style['form__title']}
            isRequired
          >
            <Input
              type="text"
              name="title"
              value={value.title}
              onChange={e => {
                updateField('title', e.target.value);
              }}
              placeholder="Тема"
              isError={!!errors.title?.message}
              disabled={isCreateApplicationLoading}
            />
          </FormElement>
          <FormElement extraClassName={style['form__message']}>
            <Textarea
              name="message"
              id="form_message"
              value={textareaFormatter(value.message)}
              onChange={e => {
                updateField('message', textareaFormatter(e.target.value));
              }}
              isError={!!errors.message?.message}
              style={{ maxHeight: '144px' }}
              rows={8}
              placeholder="Текст обращения"
              maxSymb={500}
              disabled={isCreateApplicationLoading}
            />
          </FormElement>
        </div>
        <div className={style['form__controls']}>
          {createApplicationError.isError && (
            <ErrorField>{createApplicationError.error}</ErrorField>
          )}
          <Button
            type="submit"
            option={'BlueButton'}
            width="300px"
            loading={{ isLoading: isCreateApplicationLoading, loadingMessage: 'Отправка...' }}
          >
            Отправить
          </Button>
        </div>
      </form>
    </div>
  );
};
