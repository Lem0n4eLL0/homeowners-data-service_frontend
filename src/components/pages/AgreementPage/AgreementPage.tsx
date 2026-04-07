import { useNavigate } from 'react-router';
import styles from './AgreementPage.module.scss';

export const AgreementPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles['pageWrapper']}>
      <button type="button" onClick={() => void navigate(-1)} className={styles['backButton']}>
        ← Назад
      </button>

      {/* 📄 Контент политики */}
      <article className={styles['policyContent']}>
        <h1 className={styles['title']}>ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ</h1>
        <p className={styles['subtitle']}>
          <strong>Приложение подачи данных домовладельцев</strong>
        </p>

        <section className={styles['section']}>
          <h3>1. Общие положения</h3>
          <p>
            Настоящая Политика конфиденциальности описывает, как ООО &quot;Центр Экологических
            Технологий&quot; (далее - &quot;Компания&quot;) собирает, использует и защищает вашу
            личную информацию при использовании нашего приложения и веб-сервиса.
          </p>
        </section>

        <section className={styles['section']}>
          <h3>2. Сбор информации</h3>
          <p>Мы собираем следующие типы информации:</p>
          <ul>
            <li>Личные данные (ФИО, email, телефон) — при регистрации и заполнении форм</li>
            <li>Данные о недвижимом имуществе (адрес, номер лицевого счёта)</li>
            <li>Технические данные (IP-адрес, тип устройства, история действий)</li>
            <li>Cookie-файлы для улучшения работы приложения</li>
          </ul>
        </section>

        <section className={styles['section']}>
          <h3>3. Использование информации</h3>
          <p>Мы используем собранную информацию для:</p>
          <ul>
            <li>Идентификации и аутентификации пользователя</li>
            <li>Создания и управления заявками и заказами услуг</li>
            <li>Отправки уведомлений и SMS-кодов подтверждения</li>
            <li>Улучшения работы приложения</li>
            <li>Исполнения требований законодательства РФ</li>
          </ul>
        </section>

        <section className={styles['section']}>
          <h3>4. Защита данных</h3>
          <p>
            Мы принимаем необходимые меры для защиты вашей информации от несанкционированного
            доступа, изменения или уничтожения:
          </p>
          <ul>
            <li>Шифрование данных (HTTPS/TLS)</li>
            <li>JWT-токены с ограниченным сроком действия</li>
            <li>Разграничение доступа к данным</li>
            <li>Резервное копирование и мониторинг</li>
          </ul>
        </section>

        <section className={styles['section']}>
          <h3>5. Cookie-файлы</h3>
          <p>Наше приложение использует cookie-файлы для:</p>
          <ul>
            <li>Аутентификации пользователя (хранение токена сессии)</li>
            <li>Сохранения настроек и предпочтений</li>
            <li>Улучшения пользовательского опыта</li>
          </ul>
          <p>Вы можете отключить cookie в настройках вашего браузера.</p>
        </section>

        <section className={styles['section']}>
          <h3>6. Ваши права</h3>
          <p>Вы имеете право:</p>
          <ul>
            <li>Получить информацию о ваших персональных данных</li>
            <li>Требовать исправления или удаления данных</li>
            <li>Отозвать согласие на обработку данных</li>
            <li>Требовать блокировки данных</li>
          </ul>
        </section>

        <section className={styles['section']}>
          <h3>7. Контактная информация</h3>
          <p>По всем вопросам, связанным с обработкой персональных данных, обращайтесь:</p>
          <address className={styles['contactInfo']}>
            <strong>ООО &quot;Центр Экологических Технологий&quot;</strong>
            <br />
            Адрес: 445677, г. Самара, ул. Пушкина, д. Колотушкина, оф. 228
            <br />
            Телефон: <a href="tel:+79999999999">+7 999 999 99 99</a>
            <br />
            Email: <a href="mailto:admin@zkh.ru">admin@zkh.ru</a>
          </address>
        </section>

        <section className={styles['section']}>
          <h3>8. Изменения в политике</h3>
          <p>
            Мы оставляем за собой право вносить изменения в настоящую Политику конфиденциальности.
            Актуальная версия всегда доступна в приложении и на сайте.
          </p>
          <p>
            О существенных изменениях мы уведомим вас через email или push-уведомление не менее чем
            за 7 дней до вступления изменений в силу.
          </p>
        </section>

        <hr className={styles['divider']} />

        <footer className={styles['footer']}>
          <p>
            © 2026 ООО &quot;Центр Экологических Технологий&quot;. Все права защищены.
            <br />
            Сайт:{' '}
            <a href="http://brigada-kanbanov.ru" target="_blank" rel="noopener noreferrer">
              brigada-kanbanov.ru
            </a>
          </p>
        </footer>
      </article>
    </div>
  );
};
