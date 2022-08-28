import 'core-js/stable';
import React from 'react';
import 'antd-mobile/es/global';
import { createRoot } from 'react-dom/client';
import App from './app';

const root = document.getElementById('root');

createRoot(root).render(<App />);
