import { useState, useEffect } from 'react';
import LoginScreen from './components/LoginScreen';
import Dashboard from './components/Dashboard';

const DEMO_USER = { authenticated: true, email: 'demo@draincheck.app', demo: true };

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [demo, setDemo] = useState(false);

  useEffect(() => {
    // Shareable demo link: ?demo=1 opens the dashboard with fictional sample data.
    if (new URLSearchParams(window.location.search).get('demo') === '1') {
      setDemo(true);
      setUser(DEMO_USER);
      setLoading(false);
      return;
    }
    fetch('/auth/me', { credentials: 'include' })
      .then(r => r.json())
      .then(data => {
        if (data.authenticated) setUser(data);
        setLoading(false);
      })
      .catch(() => setLoading(false)); // no backend (e.g. static demo) → show login
  }, []);

  function startDemo() {
    setDemo(true);
    setUser(DEMO_USER);
  }

  function handleLogout() {
    setUser(null);
    setDemo(false);
    // drop ?demo=1 from the URL so a refresh returns to the login screen
    if (window.location.search) window.history.replaceState({}, '', window.location.pathname);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-accent-coral border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return <LoginScreen onDemo={startDemo} />;
  return <Dashboard user={user} demo={demo} onLogout={handleLogout} />;
}
