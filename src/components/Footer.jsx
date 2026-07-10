import React from 'react';
import { Mail, Phone, MapPin, Clock, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-color)',
        padding: '60px 24px 30px 24px',
        color: 'var(--text-secondary)',
        boxSizing: 'border-box'
      }}
    >
      <div
        className="container"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '40px',
          maxWidth: '1200px',
          margin: '0 auto',
          textAlign: 'left',
          marginBottom: '40px'
        }}
        id="footer-grid"
      >
        {/* BRAND COLUMN */}
        <div>
          <h3
            style={{
              color: 'var(--text-primary)',
              fontSize: '1.4rem',
              fontWeight: 800,
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'baseline',
              gap: '4px'
            }}
          >
            <span style={{ color: 'var(--primary-pink)' }}>MA</span>
            <span style={{ color: 'var(--accent-yellow)', fontSize: '1.5rem' }}>+</span>
            <span style={{ color: 'var(--secondary-blue)' }}>AS</span>
          </h3>
          <p style={{ fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '20px' }}>
            <strong>Creaciones MA+AS</strong> - Estampamos y sublimamos tus mejores ideas sobre todo tipo de prendas y recuerdos. Ofrecemos calidad al detal y al por mayor con envíos seguros.
          </p>
          <div style={{ display: 'flex', gap: '12px' }}>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'var(--bg-tertiary)',
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid var(--border-color)'
              }}
              aria-label="Facebook"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'var(--bg-tertiary)',
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid var(--border-color)'
              }}
              aria-label="Instagram"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
          </div>
        </div>

        {/* HOURS COLUMN */}
        <div>
          <h3 style={{ color: 'var(--text-primary)', fontSize: '1.1rem', fontWeight: 700, marginBottom: '20px' }}>
            Horario de Atención
          </h3>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Clock size={16} color="var(--primary-pink)" />
              <div>
                <strong>Lunes a Viernes:</strong>
                <div>8:00 AM - 6:00 PM</div>
              </div>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Clock size={16} color="var(--primary-pink)" />
              <div>
                <strong>Sábados:</strong>
                <div>9:00 AM - 1:00 PM</div>
              </div>
            </li>
            <li style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', fontStyle: 'italic', paddingLeft: '26px' }}>
              * Domingos y Festivos cerrado para producción interna.
            </li>
          </ul>
        </div>

        {/* CONTACT COLUMN */}
        <div>
          <h3 style={{ color: 'var(--text-primary)', fontSize: '1.1rem', fontWeight: 700, marginBottom: '20px' }}>
            Contáctanos
          </h3>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Phone size={16} color="var(--secondary-blue)" />
              <span>+57 301 337 67 68</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Mail size={16} color="var(--secondary-blue)" />
              <span>contacto@creacionesmaas.com</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <MapPin size={16} color="var(--secondary-blue)" />
              <span>Cali, Colombia (Envíos nacionales)</span>
            </li>
          </ul>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div
        style={{
          borderTop: '1px solid var(--border-color)',
          paddingTop: '20px',
          fontSize: '0.8rem',
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px'
        }}
        id="footer-bottom"
      >
        <span>
          © {new Date().getFullYear()} <strong>Creaciones MA+AS</strong>. Todos los derechos reservados.
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          Hecho con <Heart size={12} fill="var(--primary-pink)" color="var(--primary-pink)" /> para estampar tus mejores recuerdos.
        </span>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #footer-grid {
            grid-template-columns: 1fr !important;
            gap: 30px !important;
            text-align: center !important;
          }
          #footer-grid div {
            text-align: center !important;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          #footer-bottom {
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
          }
        }
      `}</style>
    </footer>
  );
}
