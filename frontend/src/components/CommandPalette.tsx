import React, { useState, useEffect, useRef } from 'react';

interface CommandPaletteProps {
  onClose: () => void;
}

const CommandPalette: React.FC<CommandPaletteProps> = ({ onClose }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const dummyResults = [
    { type: 'paciente', name: 'Carlos Gomez', detail: 'ID: 9876543' },
    { type: 'paciente', name: 'Ana Torres', detail: 'ID: 1234567' },
    { type: 'acción', name: 'Agendar Nueva Cita', detail: 'Ir al calendario' },
    { type: 'ajustes', name: 'Configuración de Sucursal', detail: 'Administración' }
  ].filter(item => item.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        backdropFilter: 'blur(4px)',
        zIndex: 50,
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '10vh'
      }}
      onClick={onClose}
    >
      <div 
        className="card" 
        style={{ width: '100%', maxWidth: '600px', padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
        onClick={e => e.stopPropagation()} // Prevent close when click inside
      >
        <div style={{ padding: '16px', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center' }}>
          <span style={{ color: 'var(--text-secondary)', marginRight: '16px' }}>🔍</span>
          <input
            ref={inputRef}
            type="text"
            placeholder="Buscar pacientes, citas o comandos..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              width: '100%',
              border: 'none',
              outline: 'none',
              fontSize: '1.125rem',
              backgroundColor: 'transparent'
            }}
          />
          <button 
            onClick={onClose} 
            style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--text-secondary)', fontSize: '0.875rem' }}
          >
            ESC
          </button>
        </div>
        
        <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
          {query.length > 0 && dummyResults.length === 0 && (
            <div style={{ padding: '32px', textAlign: 'center', color: 'var(--text-secondary)' }}>
              No se encontraron resultados para "{query}"
            </div>
          )}
          
          {dummyResults.length > 0 && (
            <div style={{ padding: '8px' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', padding: '8px 16px', textTransform: 'uppercase' }}>
                Resultados
              </div>
              {dummyResults.map((result, idx) => (
                <div 
                  key={idx} 
                  style={{
                    padding: '12px 16px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    borderRadius: '8px'
                  }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--secondary-color)')}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <div>
                    <div style={{ fontWeight: 500 }}>{result.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{result.detail}</div>
                  </div>
                  <span style={{ fontSize: '0.7rem', padding: '2px 6px', background: 'var(--border-color)', borderRadius: '4px', color: 'var(--text-secondary)' }}>
                    {result.type}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
