import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/Project-X/arsenal/sw.js', { scope: '/Project-X/arsenal/' })
      .catch(error => console.error('Arsenal service worker registration failed:', error));
  });
}

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);
