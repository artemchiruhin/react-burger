import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './fonts/JetBrainsMono-Bold.ttf';
import './fonts/JetBrainsMono-Medium.ttf';
import './fonts/JetBrainsMono-Regular.ttf';
import './fonts/JetBrainsMono-SemiBold.ttf';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
