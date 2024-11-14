import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { initializeIcons } from '@fluentui/react';

import Chat from './pages/chat/Chat';
import Layout from './pages/layout/Layout';
import NoPage from './pages/NoPage';
import { AppStateProvider } from './state/AppProvider';
import { RulesModal } from './RulesModal';

import './index.css';

initializeIcons();

export default function App() {
  // Initialize state from localStorage, default to false if not found
  const [hasAcceptedRules, setHasAcceptedRules] = React.useState<boolean>(() => {
    const savedAcceptance = localStorage.getItem('hasAcceptedRules');
    // Only return true if explicitly set to 'true'
    return savedAcceptance === 'true';
  });

  const handleAcceptRules = () => {
    localStorage.setItem('hasAcceptedRules', 'true');
    setHasAcceptedRules(true);
  };

  // Clear rules acceptance when window is closed
  React.useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.removeItem('hasAcceptedRules');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <AppStateProvider>
      <RulesModal isOpen={!hasAcceptedRules} onAccept={handleAcceptRules} />
      {hasAcceptedRules && (
        <HashRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Chat />} />
              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
        </HashRouter>
      )}
    </AppStateProvider>
  );
}

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);