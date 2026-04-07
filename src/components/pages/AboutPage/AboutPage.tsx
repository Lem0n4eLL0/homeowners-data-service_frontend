import styles from './AboutPage.module.scss';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import House from '@assets/dom.webp';

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [0, -41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const position: [number, number] = [53.199951, 50.249493];

export const AboutPage = () => {
  const features = [
    {
      icon: '📱',
      title: 'Удобное приложение',
      description:
        'Передавайте показания счётчиков, оплачивайте ЖКУ и получайте новости в одном месте',
    },
    {
      icon: '🔔',
      title: 'Своевременные уведомления',
      description: 'Мгновенно получайте информацию об отключениях, собраниях и важных событиях',
    },
    {
      icon: '🔧',
      title: 'Быстрая подача заявок',
      description:
        'Сообщите о проблеме в несколько кликов — мы оперативно реагируем на все обращения',
    },
    {
      icon: '📊',
      title: 'Прозрачность',
      description: 'Отслеживайте историю платежей, расходов и выполненных работ в личном кабинете',
    },
    {
      icon: '🤝',
      title: 'Обратная связь',
      description: 'Участвуйте в жизни дома, голосуйте на собраниях и предлагайте улучшения',
    },
    {
      icon: '🛡️',
      title: 'Безопасность',
      description: 'Ваши данные защищены современными методами шифрования и хранения',
    },
  ];

  const stats = [
    { value: '15+', label: 'Домов под управлением' },
    { value: '3000+', label: 'Довольных жильцов' },
    { value: '10', label: 'Лет на рынке' },
    { value: '24/7', label: 'Поддержка жильцов' },
  ];

  const team = [
    {
      name: 'Иванов Илья',
      role: 'ПМ/Аналитик',
      description: 'Big boss',
    },
    {
      name: 'Платонов Леонид',
      role: 'Backend-разработчик/тех.лид',
      description: '',
    },
    {
      name: 'Серпухов Михаил',
      role: 'Тестировщик',
      description: '',
    },
    {
      name: 'Черванёв Владислав',
      role: 'Frontend-разработчик',
      description: '',
    },
    {
      name: 'Парфёнова Екатерина',
      role: 'Backend-разработчик',
      description: '',
    },
    {
      name: 'Поляков Максим',
      role: 'Тестировщик',
      description: '',
    },
  ];

  return (
    <div className={styles['pageWrapper']}>
      <section className={styles['hero']}>
        <div className={styles['heroContent']}>
          <h1 className={styles['title']}>О проекте</h1>
          <p className={styles['subtitle']}>
            Современная управляющая компания, которая заботится о вашем комфорте
          </p>
          <div className={styles['heroStats']}>
            {stats.map((stat, index) => (
              <div key={index} className={styles['statItem']}>
                <div className={styles['statValue']}>{stat.value}</div>
                <div className={styles['statLabel']}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles['section']}>
        <div className={styles['container']}>
          <h2 className={styles['sectionTitle']}>Наша миссия</h2>
          <div className={styles['missionContent']}>
            <div className={styles['missionText']}>
              <p>
                Мы создали этот сервис, чтобы сделать взаимодействие с управляющей компанией
                простым, прозрачным и удобным. Больше никаких очередей в офисе, бумажных квитанций и
                потерянных заявок.
              </p>
              <p>
                Наша цель — создать комфортную среду для проживания, где каждый жилец чувствует
                заботу и внимание. Мы используем современные технологии, чтобы вы могли решать все
                вопросы по дому в несколько кликов.
              </p>
              <p>
                <strong>Мы верим,</strong> что качественное управление домом — это не просто ремонт
                и уборка, а создание сообщества, где приятно жить.
              </p>
            </div>
            <div className={styles['missionImage']}>
              <img src={House} alt="Современный жилой комплекс" />
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles['section']} ${styles['featuresSection']}`}>
        <div className={styles['container']}>
          <h2 className={styles['sectionTitle']}>Возможности сервиса</h2>
          <div className={styles['featuresGrid']}>
            {features.map((feature, index) => (
              <div key={index} className={styles['featureCard']}>
                <div className={styles['featureIcon']}>{feature.icon}</div>
                <h3 className={styles['featureTitle']}>{feature.title}</h3>
                <p className={styles['featureDescription']}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles['section']}>
        <div className={styles['container']}>
          <h2 className={styles['sectionTitle']}>Наши ценности</h2>
          <div className={styles['valuesGrid']}>
            <div className={styles['valueCard']}>
              <div className={styles['valueNumber']}>01</div>
              <h3 className={styles['valueTitle']}>Открытость</h3>
              <p className={styles['valueDescription']}>
                Мы честно рассказываем о всех работах, расходах и планах. Никаких скрытых платежей и
                непонятных строк в квитанциях.
              </p>
            </div>
            <div className={styles['valueCard']}>
              <div className={styles['valueNumber']}>02</div>
              <h3 className={styles['valueTitle']}>Ответственность</h3>
              <p className={styles['valueDescription']}>
                Мы отвечаем за каждый выполненный работы и данное обещание. Если что-то пошло не так
                — исправим за свой счёт.
              </p>
            </div>
            <div className={styles['valueCard']}>
              <div className={styles['valueNumber']}>03</div>
              <h3 className={styles['valueTitle']}>Забота</h3>
              <p className={styles['valueDescription']}>
                Для нас каждый жилец — это не просто номер квартиры, а человек, который доверил нам
                свой дом. Мы относимся к этому с уважением.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles['section']} ${styles['teamSection']}`}>
        <div className={styles['container']}>
          <h2 className={styles['sectionTitle']}>Наша команда</h2>
          <div className={styles['teamGrid']}>
            {team.map((member, index) => (
              <div key={index} className={styles['teamCard']}>
                <div className={styles['teamAvatar']}>
                  <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=3b82f6&color=fff&size=128`}
                    alt={member.name}
                  />
                </div>
                <h3 className={styles['teamName']}>{member.name}</h3>
                <div className={styles['teamRole']}>{member.role}</div>
                <p className={styles['teamDescription']}>{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles['section']}>
        <div className={styles['container']}>
          <h2 className={styles['sectionTitle']}>Контакты</h2>
          <div className={styles['contactContent']}>
            <div className={styles['contactInfo']}>
              <div className={styles['contactItem']}>
                <span className={styles['contactIcon']}>📍</span>
                <div>
                  <strong>Адрес офиса:</strong>
                  <p>г. Самара, ул. Пушкина, д. Колотушкина, офис 228</p>
                </div>
              </div>
              <div className={styles['contactItem']}>
                <span className={styles['contactIcon']}>📞</span>
                <div>
                  <strong>Телефон:</strong>
                  <p>+7 (495) 123-45-67 (многоканальный)</p>
                  <p>+7 (916) 123-45-67 (аварийная служба, 24/7)</p>
                </div>
              </div>
              <div className={styles['contactItem']}>
                <span className={styles['contactIcon']}>✉️</span>
                <div>
                  <strong>Email:</strong>
                  <p>main@example.ru</p>
                  <p>support@example.ru (техподдержка)</p>
                </div>
              </div>
              <div className={styles['contactItem']}>
                <span className={styles['contactIcon']}>🕐</span>
                <div>
                  <strong>Часы работы:</strong>
                  <p>Пн-Пт: 9:00 - 18:00</p>
                  <p>Сб: 10:00 - 14:00</p>
                  <p>Вс: выходной</p>
                </div>
              </div>
            </div>

            <div className={styles['contactMap']}>
              <MapContainer
                center={position}
                zoom={13}
                scrollWheelZoom={false} // отключаем зум колёсиком, чтобы не мешал скроллу страницы
                style={{ height: '300px', width: '100%', borderRadius: '12px' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <span href="https://www.openstreetmap.org/copyright">OpenStreetMap</span> contributors'
                />
                <Marker position={position}>
                  <Popup>📍 г. Самара, ул. Пушкина, д. Колотушкина, офис 228</Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
        </div>
      </section>

      <section className={styles['ctaSection']}>
        <div className={styles['container']}>
          <h2 className={styles['ctaTitle']}>Остались вопросы?</h2>
          <p className={styles['ctaText']}>
            Свяжитесь с нами любым удобным способом — мы всегда на связи и готовы помочь!
          </p>
        </div>
      </section>
    </div>
  );
};
