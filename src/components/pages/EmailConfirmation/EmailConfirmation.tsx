import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router';
import { LOCAL_STORAGE_ACCESS_TOKEN_ALIAS } from '@/common/constants';
import styles from './EmailConfirmation.module.scss';

interface VerifyResponse {
  accessToken?: string;
  refreshToken?: string;
  message?: string;
  emailVerified?: boolean; // Добавляем поле для проверки
}

export const EmailConfirmationPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    let isCancelled = false;

    const verifyEmail = async () => {
      const confirmToken = searchParams.get('token');

      if (!confirmToken) {
        if (!isCancelled) {
          setStatus('error');
          setMessage('Ссылка недействительна: токен не найден');
        }
        return;
      }

      const API_URL = 'https://api.brigada-kanbanov.ru/api/v1/accounts/email/verify';
      const accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_ALIAS);

      try {
        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
        };
        if (accessToken) {
          headers['Authorization'] = `Bearer ${accessToken}`;
        }

        const response = await fetch(API_URL, {
          method: 'POST',
          headers,
          body: JSON.stringify({ token: confirmToken }),
        });

        if (isCancelled) return;

        if (response.ok) {
          const contentType = response.headers.get('content-type');
          let data: VerifyResponse = {};

          if (contentType?.includes('application/json') && response.status !== 204) {
            try {
              data = (await response.json()) as VerifyResponse;
            } catch (e) {
              console.warn('Failed to parse JSON response:', e);
              data = {};
            }
          }

          const isSuccessfulVerification =
            data.emailVerified === true ||
            (response.status >= 200 && response.status < 300) ||
            data.message?.toLowerCase().includes('успешно') ||
            !data.message; // пустое сообщение при 204 тоже ок

          if (isSuccessfulVerification) {
            if (data.accessToken) {
              localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_ALIAS, data.accessToken);
            }
            if (data.refreshToken) {
              localStorage.setItem('refreshToken', data.refreshToken);
            }

            setStatus('success');
            setMessage(data.message || 'Почта успешно подтверждена!');

            setTimeout(() => {
              if (!isCancelled) {
                window.location.href = '/profile?emailVerified=true';
              }
            }, 2500);
          } else {
            setStatus('error');
            setMessage(data.message || 'Не удалось подтвердить почту');
          }
          return;
        }

        // Обработка не-2xx ответов
        if (isCancelled) return;
        setStatus('error');

        switch (response.status) {
          case 304: // ✅ Добавляем обработку 304
          case 200:
          case 204:
            // Если сюда попали, значит выше была ошибка парсинга — пробуем считать успехом
            setStatus('success');
            setMessage('Почта успешно подтверждена!');
            setTimeout(() => {
              if (!isCancelled) void navigate('/profile', { state: { emailVerified: true } });
            }, 2500);
            break;
          case 400:
            setMessage('Ссылка недействительна или уже использована.');
            break;
          case 401:
            setMessage('Сессия истекла. Пожалуйста, войдите снова.');
            break;
          case 404:
            setMessage('Ссылка не найдена или уже использована.');
            break;
          case 409:
            setMessage('Эта почта уже привязана к другому аккаунту.');
            break;
          default:
            setMessage(`Ошибка подтверждения (код ${response.status}). Попробуйте позже.`);
        }
      } catch (error) {
        if (isCancelled) return;
        console.error('Network error:', error);
        setStatus('error');
        setMessage('Не удалось подключиться к серверу. Проверьте интернет.');
      }
    };

    void verifyEmail();

    return () => {
      isCancelled = true;
    };
  }, [searchParams, navigate]);

  return (
    <div className={styles['email-confirmation']}>
      <div className={styles['card']}>
        {status === 'loading' && (
          <>
            <div className={styles['spinner']}></div>
            <h2>Проверяем почту...</h2>
          </>
        )}

        {status === 'success' && (
          <div className={styles['success']}>
            <div className={styles['icon-wrapper']}>
              <div className={styles['icon']}>✓</div>
            </div>
            <h2>Готово!</h2>
            <p>{message}</p>
            <p>Перенаправляем в профиль...</p>
          </div>
        )}

        {status === 'error' && (
          <div className={styles['error']}>
            <div className={styles['icon-wrapper']}>
              <div className={styles['icon']}>✕</div>
            </div>
            <h2>Ошибка</h2>
            <p>{message}</p>
            <button
              onClick={() => {
                void navigate('/profile');
              }}
            >
              Вернуться в профиль
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
