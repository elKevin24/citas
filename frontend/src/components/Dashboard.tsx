import { Users, CalendarCheck, TrendingUp } from 'lucide-react';
import Calendar from './Calendar';

const Dashboard = () => {
  return (
    <>
      <div className="stats-grid">
        <div className="stat-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="stat-label">Citas de Hoy</div>
            <CalendarCheck size={20} color="var(--primary-color)" />
          </div>
          <div className="stat-value">24</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--success-color)', fontWeight: 500 }}>+4 confirmadas recientes</div>
        </div>
        
        <div className="stat-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="stat-label">Nuevos Pacientes</div>
            <Users size={20} color="var(--warning-color)" />
          </div>
          <div className="stat-value">8</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>En esta semana</div>
        </div>
        
        <div className="stat-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="stat-label">Tasa de Asistencia</div>
            <TrendingUp size={20} color="var(--success-color)" />
          </div>
          <div className="stat-value" style={{ color: 'var(--text-primary)' }}>92%</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--success-color)', fontWeight: 500 }}>↑ 2% vs mes anterior</div>
        </div>
      </div>

      <div style={{ marginTop: '24px' }}>
        <h3 style={{ marginBottom: '16px', fontFamily: 'Outfit, sans-serif' }}>Agenda Semanal</h3>
        <Calendar />
      </div>
    </>
  );
};

export default Dashboard;
