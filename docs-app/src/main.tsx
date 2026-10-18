import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import '@velkinvv/plainerv/styles';
import { App } from './App';
import './styles.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root container #root was not found in docs-app index.html');
}

const appTree = (
  <StrictMode>
    <App />
  </StrictMode>
);

const isPrerendered = rootElement.dataset.prerendered === 'true' && rootElement.hasChildNodes();

if (isPrerendered) {
  hydrateRoot(rootElement, appTree);
} else {
  createRoot(rootElement).render(appTree);
}
