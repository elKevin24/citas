import { appointmentSchema } from './appointmentSchema';

async function runTests() {
  let passed = 0;
  let failed = 0;

  console.log('--- Corriendo Pruebas de Esquemas de Citas ---');

  // Test 1: Valid new patient
  try {
    appointmentSchema.parse({
      isNewPatient: true,
      firstName: 'Oscar',
      lastName: 'Pérez',
      doctorId: 'D-001',
      timeSlot: '14:00',
      status: 'pending',
      day: 15
    });
    console.log('✅ Test 1 Passed: Crear nuevo paciente con datos válidos');
    passed++;
  } catch (e: any) {
    console.error('❌ Test 1 Failed: ', e.errors);
    failed++;
  }

  // Test 2: Invalid new patient (missing names)
  try {
    appointmentSchema.parse({
      isNewPatient: true,
      doctorId: 'D-001',
      timeSlot: '14:00',
      status: 'pending',
      day: 15
    });
    console.error('❌ Test 2 Failed: Debería haber fallado por falta de nombres');
    failed++;
  } catch (e: any) {
    const errorCodes = e.issues.map((err: any) => err.path[0]);
    if (errorCodes.includes('firstName') && errorCodes.includes('lastName')) {
      console.log('✅ Test 2 Passed: Validación correcta al faltar nombres');
      passed++;
    } else {
      console.error('❌ Test 2 Failed con errores inesperados: ', e.issues);
      failed++;
    }
  }

  // Test 3: Existing patient missing patientId
  try {
    appointmentSchema.parse({
      isNewPatient: false,
      doctorId: 'D-001',
      timeSlot: '14:00',
      status: 'pending',
      day: 15
    });
    console.error('❌ Test 3 Failed: Debería fallar sin patientId');
    failed++;
  } catch (e: any) {
    if (e.issues[0]?.path[0] === 'patientId') {
      console.log('✅ Test 3 Passed: Validación correcta cuando no hay patientId');
      passed++;
    } else {
      console.error('❌ Test 3 Failed: ', e.issues);
      failed++;
    }
  }

  console.log(`\nResultados: ${passed} pasaron, ${failed} fallaron.`);
  if (failed > 0) throw new Error("Some tests failed");
}

runTests();
