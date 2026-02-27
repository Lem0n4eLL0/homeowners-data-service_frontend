import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import './index.scss';
import App from './app/App';
import { BrowserRouter } from 'react-router';
import { Provider } from 'react-redux';
import { store } from './services/store';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
