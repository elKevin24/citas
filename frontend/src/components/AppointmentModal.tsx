import { useForm, useWatch } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { X } from 'lucide-react';
import { appointmentSchema } from '../schemas/appointmentSchema';
import type { AppointmentFormValues } from '../schemas/appointmentSchema';
import { orchestrateAppointmentCreation, getPatients } from '../api/appointments';

interface Props {
  onClose: () => void;
}

export default function AppointmentModal({ onClose }: Props) {
  const queryClient = useQueryClient();

  // Load existing patients
  const { data: patients = [] } = useQuery({
    queryKey: ['patients'],
    queryFn: getPatients,
  });

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors }
  } = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      isNewPatient: false,
      status: 'pending',
      day: 1, 
      patientId: '',
      doctorId: '',
      timeSlot: ''
    }
  });

  // Watch to toggle the patient form view
  const isNewPatient = useWatch({ control, name: 'isNewPatient' });

  const mutation = useMutation({
    mutationFn: orchestrateAppointmentCreation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      queryClient.invalidateQueries({ queryKey: ['patients'] });
      onClose();
    },
  });

  const onSubmit: SubmitHandler<AppointmentFormValues> = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="command-palette-backdrop" onClick={onClose} style={{ zIndex: 50 }}>
      <div 
        className="command-palette" 
        onClick={e => e.stopPropagation()}
        style={{ padding: '24px', maxWidth: '500px', overflowY: 'auto', maxHeight: '90vh' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2>Nueva Cita</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

          <div className="card" style={{ padding: '16px', backgroundColor: 'var(--bg-color)', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h3 style={{ fontSize: '1rem', margin: 0 }}>Datos del Paciente</h3>
              <label style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                <input type="checkbox" {...register('isNewPatient')} onChange={(e) => {
                    setValue('isNewPatient', e.target.checked);
                    if (e.target.checked) setValue('patientId', '');
                }} />
                Crear nuevo paciente
              </label>
            </div>

            {!isNewPatient ? (
              <div className="form-group">
                <label>Seleccionar Paciente Existente *</label>
                <select 
                  {...register('patientId')} 
                  className="search-input" 
                  style={{ width: '100%', padding: '12px', appearance: 'menulist' }}
                >
                  <option value="">Buscar paciente...</option>
                  {patients.map(p => (
                    <option key={p.id} value={p.id}>{p.firstName} {p.lastName}</option>
                  ))}
                </select>
                {errors.patientId && <span style={{ color: '#ef4444', fontSize: '0.8rem' }}>{errors.patientId.message}</span>}
              </div>
            ) : (
               <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <div className="form-group" style={{ flex: '1 1 45%' }}>
                  <label>Nombre *</label>
                  <input {...register('firstName')} className="search-input" style={{ width: '100%', padding: '10px' }} />
                  {errors.firstName && <span style={{ color: '#ef4444', fontSize: '0.8rem' }}>{errors.firstName.message}</span>}
                </div>
                <div className="form-group" style={{ flex: '1 1 45%' }}>
                  <label>Apellido *</label>
                  <input {...register('lastName')} className="search-input" style={{ width: '100%', padding: '10px' }} />
                  {errors.lastName && <span style={{ color: '#ef4444', fontSize: '0.8rem' }}>{errors.lastName.message}</span>}
                </div>
                <div className="form-group" style={{ flex: '1 1 45%' }}>
                  <label>Email (Opcional)</label>
                  <input {...register('email')} type="email" className="search-input" style={{ width: '100%', padding: '10px' }} />
                  {errors.email && <span style={{ color: '#ef4444', fontSize: '0.8rem' }}>{errors.email.message}</span>}
                </div>
                <div className="form-group" style={{ flex: '1 1 45%' }}>
                  <label>Teléfono (Opcional)</label>
                  <input {...register('phone')} className="search-input" style={{ width: '100%', padding: '10px' }} />
                </div>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: '16px' }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label>Doctor *</label>
              <select {...register('doctorId')} className="search-input" style={{ width: '100%', padding: '12px' }}>
                <option value="">Seleccionar...</option>
                <option value="D-001">Dr. House</option>
                <option value="D-002">Dra. Grey</option>
              </select>
              {errors.doctorId && <span style={{ color: '#ef4444', fontSize: '0.8rem' }}>{errors.doctorId.message}</span>}
            </div>

            <div className="form-group" style={{ flex: 1 }}>
              <label>Fecha sugerida *</label>
              <input 
                type="date"
                min={new Date().toISOString().split('T')[0]}
                className="search-input" 
                style={{ width: '100%', padding: '12px' }}
                onChange={(e) => {
                   const dayNumber = new Date(e.target.value).getDate();
                   setValue('day', isNaN(dayNumber) ? 1 : dayNumber);
                }}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Disponibilidad ({useWatch({ control, name: 'doctorId' }) ? 'Horarios libres' : 'Seleccione un doctor primero'}) *</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '4px' }}>
              {['09:00', '09:30', '10:00', '11:30', '14:00', '14:30', '15:00', '16:30'].map(time => {
                const isSelected = useWatch({ control, name: 'timeSlot' }) === time;
                const isDoctorSelected = !!useWatch({ control, name: 'doctorId' });
                return (
                  <button
                    key={time}
                    type="button"
                    disabled={!isDoctorSelected}
                    onClick={() => setValue('timeSlot', time, { shouldValidate: true })}
                    className={`btn ${isSelected ? 'btn-primary' : 'btn-secondary'}`}
                    style={{
                      padding: '8px 16px',
                      opacity: !isDoctorSelected ? 0.5 : 1,
                      cursor: !isDoctorSelected ? 'not-allowed' : 'pointer',
                      borderRadius: '20px'
                    }}
                  >
                    {time}
                  </button>
                );
              })}
            </div>
            {errors.timeSlot && <span style={{ color: '#ef4444', fontSize: '0.8rem' }}>Debe seleccionar un horario disponible</span>}
          </div>

          <div className="form-group">
            <label>Notas (Metadatos JSONB opcionales)</label>
            <textarea 
              {...register('notes')} 
              className="search-input" 
              style={{ width: '100%', padding: '12px', minHeight: '60px', resize: 'none' }}
              placeholder="Síntomas iniciales..."
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '8px' }}>
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancelar</button>
            <button type="submit" className="btn btn-primary" disabled={mutation.isPending}>
              {mutation.isPending ? 'Guardando...' : 'Agendar Cita'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
