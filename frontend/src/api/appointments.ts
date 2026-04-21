import type { Appointment, AppointmentFormValues } from '../schemas/appointmentSchema';

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
}

const ORG_ID = '11111111-1111-1111-1111-111111111111';
const BRANCH_ID = '22222222-2222-2222-2222-222222222222';
const DOCTOR_ID = '33333333-3333-3333-3333-333333333333'; // Default seeded doctor

export const searchPatients = async (query: string): Promise<Patient[]> => {
  const res = await fetch(`/api/v1/organizations/${ORG_ID}/patients/search?query=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error('Error al buscar pacientes');
  return res.json();
};

export const getPatients = async (): Promise<Patient[]> => {
  const res = await fetch(`/api/v1/organizations/${ORG_ID}/patients`);
  if (!res.ok) throw new Error('Error al cargar pacientes');
  return res.json();
};

export const createPatient = async (data: Omit<Patient, 'id'>): Promise<Patient> => {
  const res = await fetch(`/api/v1/organizations/${ORG_ID}/patients`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Error al crear paciente');
  return res.json();
};

export const getAppointments = async (): Promise<Appointment[]> => {
  const res = await fetch(`/api/v1/organizations/${ORG_ID}/branches/${BRANCH_ID}/appointments`);
  if (!res.ok) throw new Error('Error al cargar citas');
  const data = await res.json();
  // Map backend response: assuming response contains startTime, endTime, status, etc.
  return data.map((item: any) => {
    // Basic mapping logic
    const startDate = new Date(item.startTime);
    return {
      id: item.id,
      patientId: item.patientId,
      patientName: 'Paciente (ID: ' + item.patientId.substring(0, 5) + ')', // The response might not have patientName depending on DTO
      doctorId: item.doctorId,
      timeSlot: startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: item.status?.toLowerCase() || 'pending',
      day: startDate.getDate(),
      notes: item.metadata ? item.metadata.notes : undefined
    };
  });
};

export const orchestrateAppointmentCreation = async (data: AppointmentFormValues): Promise<Appointment> => {
  let finalPatientId = data.patientId;

  // 1. Create Patient if required
  if (data.isNewPatient) {
    const newPatient = await createPatient({
      firstName: data.firstName || '',
      lastName: data.lastName || '',
      email: data.email,
      phone: data.phone
    });
    finalPatientId = newPatient.id;
  }

  // 2. Map date/time correctly for backend Fake mapping: day of current month
  const now = new Date();
  const [hours, minutes] = data.timeSlot.split(':');
  const startDate = new Date(now.getFullYear(), now.getMonth(), data.day, parseInt(hours), parseInt(minutes));
  const endDate = new Date(startDate.getTime() + 30 * 60000); // 30 min duration

  // 3. Create Appointment using the known Patient ID
  const payload = {
    doctorId: data.doctorId === 'D-001' || data.doctorId === 'D-002' ? DOCTOR_ID : DOCTOR_ID, // Use valid UUID
    patientId: finalPatientId,
    branchId: BRANCH_ID,
    startTime: startDate.toISOString(),
    endTime: endDate.toISOString(),
    metadata: data.notes ? { notes: data.notes } : {}
  };

  const res = await fetch(`/api/v1/organizations/${ORG_ID}/branches/${BRANCH_ID}/appointments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
      const respData = await res.text();
      console.error(respData);
      throw new Error('Error al crear la cita');
  }
  
  const created = await res.json();

  return {
    id: created.id,
    patientId: created.patientId,
    patientName: data.isNewPatient ? `${data.firstName} ${data.lastName}` : 'Cita Actualizada',
    doctorId: data.doctorId,
    timeSlot: data.timeSlot,
    status: created.status?.toLowerCase() || 'pending',
    notes: data.notes,
    day: data.day
  };
};

export const updateAppointmentDay = async (_id: number, _newDay: number): Promise<Appointment> => {
  throw new Error("Op. arrastrar y soltar hacia backend está pauntada pero no implementada E2E aún.");
};
