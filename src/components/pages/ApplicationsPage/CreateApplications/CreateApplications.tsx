import { FormElement } from '@/components/forms/FormElement';
import style from './CreateApplications.module.scss';
import commonStyle from '@styles/common.module.scss';
import useValidator, { ValidationScheme } from '@/hooks/useValidator';
import { VALIDATORS } from '@/common/constants';
import { SyntheticEvent } from 'react';
import { Input } from '@/components/forms/Input';
import { useAppDispatch, useAppSelector } from '@/services/store';
import { selectUser } from '@/services/slices/user';
import { Button } from '@/components/Button';
import { createApplicationApplication } from '@/services/slices/applications';
import { CreateApplicationsRequest } from '@/api/apiTypes';

const sendVerificationCodeFormScheme: ValidationScheme<CreateApplicationsRequest> = {
  propertyId: VALIDATORS.PROPERTY_ID,
  title: VALIDATORS.APPLICATIONS.TITLE,
  message: VALIDATORS.APPLICATIONS.MESSAGE,
};

export const CreateApplications = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const { isValid, isChanged, errors, value, validate, updateField, toInitalValue } =
    useValidator<CreateApplicationsRequest>({
      initialValue: {
        propertyId: '',
        title: '',
        message: '',
      },
      scheme: sendVerificationCodeFormScheme,
      validateIsToched: true,
      validateOnChange: true,
    });

  const createApplicationsFormHandler = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    void dispatch(createApplicationApplication(value));
  };

  return (
    <div className={style['content']}>
      <form
        name="update_profile"
        className={style['content__form-update']}
        onSubmit={e => void createApplicationsFormHandler(e)}
      >
        <FormElement label="Адрес">
          <Input
            name="adress"
            type="text"
            placeholder="Адрес"
            extraClassName={commonStyle['form_field_base']}
          />
        </FormElement>
        <FormElement label="Фамилия">
          <Input
            name="lastName"
            type="text"
            placeholder="Введите фамилию"
            defaultValue={user.lastName}
            extraClassName={commonStyle['form_field_base']}
            disabled={true}
          />
        </FormElement>
        <FormElement label="Имя">
          <Input
            name="firstName"
            type="text"
            placeholder="Введите имя"
            defaultValue={user.firstName}
            extraClassName={commonStyle['form_field_base']}
            disabled={true}
          />
        </FormElement>
        <FormElement label="Отчество">
          <Input
            name="surname"
            type="text"
            placeholder="Введите отчество"
            defaultValue={user.surname}
            extraClassName={commonStyle['form_field_base']}
            disabled={true}
          />
        </FormElement>
        <FormElement label="Телефон">
          <Input
            name="phone"
            type="text"
            placeholder="Введите телефон"
            defaultValue={user.phone}
            extraClassName={commonStyle['form_field_base']}
            disabled={true}
          />
        </FormElement>
        <FormElement label="Email">
          <Input
            name="email"
            type="text"
            placeholder="Введите email"
            defaultValue={user.email}
            extraClassName={commonStyle['form_field_base']}
            disabled={true}
          />
        </FormElement>

        <div className={style['content__controls']}>
          <Button type="submit" option={'BlueButton'} width="300px">
            Отправить
          </Button>
        </div>
      </form>
    </div>
  );
};
