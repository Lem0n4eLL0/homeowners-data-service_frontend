import clsx from 'clsx';
import commonStyle from '@styles/common.module.scss';
import style from './ReadingsPage.module.scss';
import { LinksBar } from '@/components/LinksBar';
import { useAppDispatch, useAppSelector } from '@/services/store';
import { selectReadingsPageState, setReadingsPageState } from '@/services/slices/app';

export const ReadingsPage = () => {
  const dispatch = useAppDispatch();
  const readingsPageStates = useAppSelector(selectReadingsPageState);

  return (
    <div className={clsx(commonStyle['base_page_wrapper'], style['content_wrapper'])}>
      <h1 className={commonStyle['base_page_title']}>Показания</h1>
      <div className={style['content']}>
        <LinksBar
          active={readingsPageStates}
          links={[
            {
              name: 'ReadingsPageMeters',
              label: 'Подать показания',
              onClick: () => {
                dispatch(setReadingsPageState('ReadingsPageMeters'));
              },
            },
            {
              name: 'ReadingsPageHistory',
              label: 'История',
              onClick: () => {
                dispatch(setReadingsPageState('ReadingsPageHistory'));
              },
            },
          ]}
        />
        {readingsPageStates === 'ReadingsPageMeters' ? (
          <div>ReadingsPageMeters</div>
        ) : readingsPageStates === 'ReadingsPageHistory' ? (
          <div>ReadingsPageHistory</div>
        ) : (
          <>Error</>
        )}
      </div>
    </div>
  );
};
