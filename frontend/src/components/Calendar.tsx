import React, { useState } from 'react';

const Calendar = () => {
  // Simple state to demonstrate drag and drop functionality
  const [appointments, setAppointments] = useState([
    { id: 1, title: 'Carlos Gomez - Chequeo', day: 2, status: 'confirmed' },
    { id: 2, title: 'Ana Torres - Consulta', day: 3, status: 'pending' },
  ]);

  const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  const gridCells = Array.from({ length: 35 }, (_, i) => i + 1); // 5 weeks

  const handleDragStart = (e: React.DragEvent, id: number) => {
    e.dataTransfer.setData('appointmentId', id.toString());
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault(); // allow drop
  };

  const handleDrop = (e: React.DragEvent, targetDay: number) => {
    e.preventDefault();
    const id = parseInt(e.dataTransfer.getData('appointmentId'));
    setAppointments(prev => 
      prev.map(app => app.id === id ? { ...app, day: targetDay } : app)
    );
  };

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
        <h3>Flujo de Pacientes</h3>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn btn-secondary">&lt;</button>
          <button className="btn btn-secondary">Hoy</button>
          <button className="btn btn-secondary">&gt;</button>
        </div>
      </div>

      <div className="calendar-grid">
        {days.map(day => (
          <div key={day} className="calendar-header-day">{day}</div>
        ))}
        
        {gridCells.map((cell) => (
          <div 
            key={cell} 
            className="calendar-cell"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, cell)}
          >
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{cell}</span>
            {appointments
              .filter(app => app.day === cell)
              .map(app => (
                <div 
                  key={app.id} 
                  className="appointment-item"
                  draggable
                  onDragStart={(e) => handleDragStart(e, app.id)}
                >
                  <div style={{ fontWeight: 600 }}>{app.title}</div>
                  <span className={`status-badge status-${app.status}`}>
                    {app.status === 'confirmed' ? 'Confirmado' : 'Pendiente'}
                  </span>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
