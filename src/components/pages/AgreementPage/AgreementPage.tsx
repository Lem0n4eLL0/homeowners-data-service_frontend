import { useNavigate } from 'react-router';
import style from './AgreementPage.module.scss';

export const AgreementPage = () => {
  const navigate = useNavigate();

  const returnBackHandker = () => {
    void navigate(-1);
  };

  return (
    <div className={style['content']}>
      <button type="button" onClick={returnBackHandker}>
        click me
      </button>
      AgreementPage
    </div>
  );
};
