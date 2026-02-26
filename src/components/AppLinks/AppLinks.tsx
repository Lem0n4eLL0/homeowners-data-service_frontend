import style from './AppLinks.module.scss';
import AppStore from '@assets/AppStore.png';
import GooglePlay from '@assets/GooglePlay.png';

interface IAppLinks {
  height?: number | string;
}

const APP_STORE_URL = import.meta.env.VITE_APP_STORE_URL ?? '';
const GOOGLE_PLAY_URL = import.meta.env.VITE_GOOGLE_PLAY_URL ?? '';

export const AppLinks = (props: IAppLinks) => {
  const { height = 32 } = props;

  return (
    <div className={style['content']} style={{ height: height }}>
      <a href={APP_STORE_URL ?? '#no_scroll'} target="_blank" rel="noreferrer">
        <img src={AppStore} alt="App store" />
      </a>
      <a href={GOOGLE_PLAY_URL ?? '#no_scroll'} target="_blank" rel="noreferrer">
        <img src={GooglePlay} alt="Google play" />
      </a>
    </div>
  );
};
