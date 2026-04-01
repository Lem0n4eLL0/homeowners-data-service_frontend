import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router';

interface VerifyResponse {
  accessToken?: string;
  refreshToken?: string;
  message?: string;
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
      const accessToken = localStorage.getItem('accessToken');

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
          let data = {} as VerifyResponse;

          const contentType = response.headers.get('content-type');
          if (contentType?.includes('application/json')) {
            data = (await response.json()) as VerifyResponse;
          }

          if (data.accessToken) {
            localStorage.setItem('accessToken', data.accessToken);
          }
          if (data.refreshToken) {
            localStorage.setItem('refreshToken', data.refreshToken);
          }

          setStatus('success');
          setMessage(data.message || 'Почта успешно подтверждена!');

          setTimeout(() => {
            if (!isCancelled) {
              void navigate('/profile', { state: { emailVerified: true } });
            }
          }, 2500);

          return;
        }

        if (isCancelled) return;

        setStatus('error');

        if (response.status === 401) {
          setMessage('Сессия истекла. Пожалуйста, войдите снова.');
        } else if (response.status === 400 || response.status === 404) {
          setMessage('Ссылка недействительна или уже использована.');
        } else {
          setMessage('Ошибка подтверждения. Попробуйте позже.');
        }
      } catch (error) {
        if (isCancelled) return;

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
    <div>
      <div>
        {status === 'loading' && (
          <>
            <div></div>
            <h2>Проверяем почту...</h2>
          </>
        )}

        {status === 'success' && (
          <>
            <div>✓</div>
            <h2>Готово!</h2>
            <p>{message}</p>
            <p>Перенаправляем в профиль...</p>
          </>
        )}

        {status === 'error' && (
          <>
            <div>✕</div>
            <h2>Ошибка</h2>
            <p>{message}</p>
            <button onClick={() => void navigate('/profile')}>Вернуться в профиль</button>
          </>
        )}
      </div>
    </div>
  );
};
