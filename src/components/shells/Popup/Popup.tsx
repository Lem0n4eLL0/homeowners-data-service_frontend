import { useEffect } from 'react';
import style from './Popup.module.scss';
import cross from '@assets/cross_icon.svg';
import { useNavigate } from 'react-router';

type IPopup = {
  children: React.ReactNode;
  isExitOnESC?: boolean;
  isExitOnClickOutside?: boolean;
  onClose?: () => void;
};

export const Popup = (props: IPopup) => {
  const { children, isExitOnESC = true, isExitOnClickOutside = true, onClose } = props;
  const navigate = useNavigate();

  const handleClose = () => {
    onClose?.();
    void navigate(-1);
  };

  useEffect(() => {
    if (!isExitOnESC) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isExitOnESC]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isExitOnClickOutside && event.target === event.currentTarget) {
      handleClose();
    }
  };

  const handleContentClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return (
    <div
      className={style['content__wrapper']}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
    >
      <div className={style['content']} onClick={handleContentClick}>
        <button type="button" className={style['cross']} onClick={handleClose} aria-label="Закрыть">
          <img src={cross} alt="" className={style['cross__icon']} />
        </button>
        {children}
      </div>
    </div>
  );
};
