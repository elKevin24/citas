import React, { useState } from 'react';
import { LayoutDashboard, Calendar as CalendarIcon, Users, Search, Plus } from 'lucide-react';
import './index.css';

// Components
import CommandPalette from './components/CommandPalette';
import Dashboard from './components/Dashboard';
import Calendar from './components/Calendar';
import AppointmentModal from './components/AppointmentModal';
import PatientList from './components/PatientList';

function App() {
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'calendar' | 'patients'>('dashboard');

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
      
      {/* Appointment Modal */}
      {isModalOpen && <AppointmentModal onClose={() => setIsModalOpen(false)} />}

      {/* Sidebar */}
      <aside className="sidebar">
        <div style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--primary-color)', marginBottom: '32px' }}>
          MediSaaS
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button 
            className="btn btn-secondary" 
            style={{ justifyContent: 'flex-start', border: 'none', background: activeTab === 'dashboard' ? 'var(--secondary-color)' : 'transparent' }}
            onClick={() => setActiveTab('dashboard')}
          >
            <LayoutDashboard size={18} /> Dashboard
          </button>
          <button 
            className="btn btn-secondary" 
            style={{ justifyContent: 'flex-start', border: 'none', background: activeTab === 'calendar' ? 'var(--secondary-color)' : 'transparent' }}
            onClick={() => setActiveTab('calendar')}
          >
            <CalendarIcon size={18} /> Calendario
          </button>
          <button 
            className="btn btn-secondary" 
            style={{ justifyContent: 'flex-start', border: 'none', background: activeTab === 'patients' ? 'var(--secondary-color)' : 'transparent' }}
            onClick={() => setActiveTab('patients')}
          >
            <Users size={18} /> Pacientes
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="header">
          <h2>{activeTab === 'dashboard' ? 'Dashboard' : activeTab === 'calendar' ? 'Calendario' : 'Pacientes'}</h2>
          
          <div className="search-container" onClick={() => setIsCommandOpen(true)}>
            <Search className="search-icon" size={16} />
            <input 
              type="text" 
              className="search-input" 
              placeholder="Buscar paciente o cita..." 
              readOnly
            />
            <span className="cmd-k-hint">⌘ K</span>
          </div>

          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
              <Plus size={18} /> Nueva Cita
            </button>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary-color)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
              DR
            </div>
          </div>
        </header>

        <section className="content-area">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'calendar' && <Calendar />}
          {activeTab === 'patients' && <PatientList />}
        </section>
      </main>
    </div>
  );
}

export default App;
