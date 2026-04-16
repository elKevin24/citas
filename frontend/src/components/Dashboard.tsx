import React from 'react';
import Calendar from './Calendar';

const Dashboard = () => {
  return (
    <>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Citas de Hoy</div>
          <div className="stat-value">24</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--success-color)' }}>+4 confirmadas recientes</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Nuevos Pacientes</div>
          <div className="stat-value">8</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Tasa de Asistencia</div>
          <div className="stat-value" style={{ color: 'var(--primary-color)' }}>92%</div>
        </div>
      </div>

      <Calendar />
    </>
  );
};

export default Dashboard;
