import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAppointments, updateAppointmentDay } from '../api/appointments';
import type { Appointment } from '../schemas/appointmentSchema';

const Calendar = () => {
  const queryClient = useQueryClient();

  const { data: appointments = [], isLoading, isError } = useQuery<Appointment[]>({
    queryKey: ['appointments'],
    queryFn: getAppointments,
  });

  const mutation = useMutation({
    mutationFn: ({ id, day }: { id: number; day: number }) => updateAppointmentDay(id, day),
    onMutate: async ({ id, day }) => {
      // Optimistic update
      await queryClient.cancelQueries({ queryKey: ['appointments'] });
      const previousAppointments = queryClient.getQueryData<Appointment[]>(['appointments']);
      
      queryClient.setQueryData<Appointment[]>(['appointments'], (old) => 
        old?.map((app) => app.id === id ? { ...app, day } : app)
      );

      return { previousAppointments };
    },
    onError: (_err, _variables, context) => {
      queryClient.setQueryData(['appointments'], context?.previousAppointments);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
    },
  });

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
    if (!isNaN(id)) {
      mutation.mutate({ id, day: targetDay });
    }
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

      {isLoading && <div style={{ padding: '20px', textAlign: 'center' }}>Cargando citas...</div>}
      {isError && <div style={{ padding: '20px', textAlign: 'center', color: 'red' }}>Error cargando citas</div>}

      {!isLoading && !isError && (
        <div className="calendar-grid">
          {days.map(day => (
            <div key={day} className="calendar-header-day">{day}</div>
          ))}
          
          {gridCells.map((cell) => (
            <div 
              key={cell} 
              className={`calendar-cell ${mutation.isPending ? 'opacity-50' : ''}`}
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
                    <div style={{ fontWeight: 600 }}>{app.patientName}</div>
                    <div style={{ fontSize: '0.7rem' }}>{app.timeSlot}</div>
                    <span className={`status-badge status-${app.status}`}>
                      {app.status === 'confirmed' ? 'Confirmado' : 'Pendiente'}
                    </span>
                  </div>
                ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Calendar;
