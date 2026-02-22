import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import './index.scss';
import App from './app/App';
import { BrowserRouter } from 'react-router';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
