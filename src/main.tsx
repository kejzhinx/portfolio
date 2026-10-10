import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Ensure that whenever the browser is refreshed or reloaded from any section,
// it always reloads back into the Home page ('/') as requested
if (typeof window !== 'undefined' && (window.location.pathname !== '/' || window.location.hash)) {
  try {
    window.history.replaceState(null, '', '/');
  } catch {
    // ignore
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
