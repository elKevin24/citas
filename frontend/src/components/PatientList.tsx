import React, { useState, useEffect } from 'react';
import { Search, UserPlus, Mail, Phone, MoreVertical } from 'lucide-react';
import { getPatients, Patient } from '../api/appointments';

const PatientList = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const data = await getPatients();
        setPatients(data);
      } catch (err) {
        console.error('Failed to fetch patients', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPatients();
  }, []);

  const filteredPatients = patients.filter(p => 
    `${p.firstName} ${p.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.phone?.includes(searchQuery)
  );

  return (
    <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
      <div style={{ padding: '24px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ margin: 0 }}>Directorio de Pacientes</h3>
          <p style={{ margin: '4px 0 0 0', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            Administra la información de contacto y expedientes.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <div className="search-container" style={{ width: '300px' }}>
            <Search size={16} className="search-icon" />
            <input 
              type="text" 
              placeholder="Buscar por nombre, email o tel..." 
              className="search-input"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="btn btn-primary" style={{ padding: '8px 16px' }}>
            <UserPlus size={18} /> Nuevo Paciente
          </button>
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'var(--secondary-color)', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-secondary)', letterSpacing: '0.05em' }}>
              <th style={{ padding: '12px 24px' }}>Paciente</th>
              <th style={{ padding: '12px 24px' }}>Contacto</th>
              <th style={{ padding: '12px 24px' }}>Estado</th>
              <th style={{ padding: '12px 24px' }}>Fecha Registro</th>
              <th style={{ padding: '12px 24px' }}></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} style={{ padding: '48px', textAlign: 'center' }}>Cargando pacientes...</td></tr>
            ) : filteredPatients.length === 0 ? (
              <tr><td colSpan={5} style={{ padding: '48px', textAlign: 'center' }}>No se encontraron pacientes.</td></tr>
            ) : filteredPatients.map(patient => (
              <tr key={patient.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '16px 24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--secondary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, color: 'var(--primary-color)' }}>
                      {patient.firstName[0]}{patient.lastName[0]}
                    </div>
                    <div>
                      <div style={{ fontWeight: 500 }}>{patient.firstName} {patient.lastName}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>ID: {patient.id.substring(0,8)}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '16px 24px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}>
                      <Mail size={14} color="var(--text-secondary)" /> {patient.email || 'N/A'}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}>
                      <Phone size={14} color="var(--text-secondary)" /> {patient.phone || 'N/A'}
                    </div>
                  </div>
                </td>
                <td style={{ padding: '16px 24px' }}>
                  <span style={{ padding: '4px 8px', borderRadius: '12px', background: 'var(--success-color-soft)', color: 'var(--success-color)', fontSize: '0.75rem', fontWeight: 600 }}>
                    Activo
                  </span>
                </td>
                <td style={{ padding: '16px 24px', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  Hoy
                </td>
                <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                  <button style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                    <MoreVertical size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientList;
