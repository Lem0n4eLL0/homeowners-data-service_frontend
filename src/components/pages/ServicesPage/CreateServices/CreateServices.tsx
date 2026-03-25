import style from './CreateServices.module.scss';
import { useAppSelector } from '@/services/store';
import { Column, Table } from '@/components/shells/Table';
import { Services } from '@/common/commonTypes';
import { priceFormatter } from '@/utils/utils';
import { selectDataServices } from '@/services/slices/services';
import { useLocation, useNavigate } from 'react-router';

const tableServicesColumns: Column<Services>[] = [
  {
    key: 'title',
    title: 'услуга',
  },
  {
    key: 'price',
    title: 'стоимость',
    render: priceFormatter,
  },
];

export const CreateServices = () => {
  const { services } = useAppSelector(selectDataServices);
  const navigator = useNavigate();
  const location = useLocation();

  const servicesOpenHandler = (item: Services) => {
    void navigator(`create/${item.id}`, {
      state: {
        backgroundLocation: location,
      },
    });
  };

  return (
    <div className={style['content']}>
      <Table<Services>
        columns={tableServicesColumns}
        data={services}
        onRowClick={servicesOpenHandler}
        tableHeight={'100%'}
      />
    </div>
  );
};
