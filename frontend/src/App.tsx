import React, { useState } from 'react';
import './index.css';

// Components
import CommandPalette from './components/CommandPalette';
import Dashboard from './components/Dashboard';

function App() {
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  // Keyboard listener for CMD+K
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="app-container">
      {/* Search Overlay CMD+K */}
      {isCommandOpen && <CommandPalette onClose={() => setIsCommandOpen(false)} />}
      
      {/* Sidebar */}
      <aside className="sidebar">
        <div style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--primary-color)', marginBottom: '32px' }}>
          MediSaaS
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button className="btn btn-secondary" style={{ justifyContent: 'flex-start', border: 'none', background: 'var(--secondary-color)' }}>
            <span role="img" aria-label="Dashboard">📊</span> Dashboard
          </button>
          <button className="btn btn-secondary" style={{ justifyContent: 'flex-start', border: 'none' }}>
            <span role="img" aria-label="Calendar">📅</span> Calendario
          </button>
          <button className="btn btn-secondary" style={{ justifyContent: 'flex-start', border: 'none' }}>
            <span role="img" aria-label="Patients">👥</span> Pacientes
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="header">
          <h2>Dashboard</h2>
          
          <div className="search-container" onClick={() => setIsCommandOpen(true)}>
            <span className="search-icon">🔍</span>
            <input 
              type="text" 
              className="search-input" 
              placeholder="Buscar..." 
              readOnly
            />
            <span className="cmd-k-hint">⌘ K</span>
          </div>

          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <button className="btn btn-primary">+ Nueva Cita</button>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary-color)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
              DR
            </div>
          </div>
        </header>

        <section className="content-area">
          <Dashboard />
        </section>
      </main>
    </div>
  );
}

export default App;
