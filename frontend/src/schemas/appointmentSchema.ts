import { z } from 'zod';

export const appointmentSchema = z.object({
  isNewPatient: z.boolean(),
  patientId: z.string().optional(),
  
  // Fields for new patient creation
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email("Correo inválido").optional().or(z.literal('')),
  phone: z.string().optional(),

  doctorId: z.string().min(1, "Debe seleccionar un doctor"),
  timeSlot: z.string().min(1, "El horario es requerido"),
  status: z.enum(['pending', 'confirmed', 'cancelled']),
  notes: z.string().optional(),
  day: z.number().min(1).max(35),
}).superRefine((data, ctx) => {
  if (data.isNewPatient) {
    if (!data.firstName || data.firstName.trim().length < 2) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['firstName'],
        message: "El nombre es requerido para pacientes nuevos",
      });
    }
    if (!data.lastName || data.lastName.trim().length < 2) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['lastName'],
        message: "El apellido es requerido",
      });
    }
  } else {
    // Existing patient
    if (!data.patientId) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['patientId'],
        message: "Seleccione un paciente existente",
      });
    }
  }
});

export type AppointmentFormValues = z.infer<typeof appointmentSchema>;

export interface Appointment {
  id: number;
  patientId?: string;
  patientName: string; // for display
  doctorId: string;
  timeSlot: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  notes?: string;
  day: number;
}
