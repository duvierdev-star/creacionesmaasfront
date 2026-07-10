import React, { useState, useEffect } from 'react';
import { Palette, Menu, X, Sun, Moon, Sparkles } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState('light');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Scroll listener for sticky header styling
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'py-3 bg-white/80 dark:bg-[#12101f]/85 backdrop-blur-md shadow-md border-b border-black/5 dark:border-white/5'
          : 'py-5 bg-transparent'
      }`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 100,
        display: 'flex',
        justifyContent: 'center',
        padding: scrolled ? '12px 24px' : '20px 24px',
        boxSizing: 'border-box'
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: '1200px',
          margin: '0 auto',
          width: '100%'
        }}
      >
        {/* LOGO */}
        <a
          href="#inicio"
          style={{
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontWeight: 800,
            fontSize: '1.5rem',
            letterSpacing: '-0.5px'
          }}
        >
          <span style={{ color: 'var(--primary-pink)' }}>MA</span>
          <span
            style={{
              color: 'var(--accent-yellow)',
              fontSize: '1.7rem',
              display: 'inline-block',
              transform: 'translateY(-2px)'
            }}
          >
            +
          </span>
          <span style={{ color: 'var(--secondary-blue)' }}>AS</span>
          <span
            style={{
              fontSize: '0.9rem',
              fontWeight: 400,
              background: 'var(--bg-tertiary)',
              color: 'var(--text-primary)',
              padding: '2px 8px',
              borderRadius: '20px',
              marginLeft: '6px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              border: '1px solid var(--border-color)'
            }}
          >
            <Sparkles size={12} color="var(--primary-pink)" /> Creaciones
          </span>
        </a>

        {/* DESKTOP NAV LINKS */}
        <div
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '30px'
          }}
          className="desktop-menu"
        >
          {['Inicio', 'Categorias', 'Personalizar', 'Cotizar', 'Portafolio'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace('ñ', 'n')}`}
              style={{
                textDecoration: 'none',
                color: 'var(--text-primary)',
                fontWeight: 600,
                fontSize: '0.95rem',
                position: 'relative',
                padding: '4px 0'
              }}
              className="nav-link"
            >
              {item}
            </a>
          ))}
        </div>

        {/* BUTTONS (THEME + MENU) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={toggleTheme}
            style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'var(--shadow-sm)'
            }}
            aria-label="Cambiar tema"
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="mobile-toggle"
            style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'var(--shadow-sm)'
            }}
            aria-label="Abrir menú"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div
          className="glass-panel"
          style={{
            position: 'absolute',
            top: '100%',
            left: '24px',
            right: '24px',
            marginTop: '10px',
            display: 'flex',
            flexDirection: 'column',
            padding: '24px',
            gap: '16px',
            textAlign: 'center',
            boxSizing: 'border-box'
          }}
        >
          {['Inicio', 'Categorias', 'Personalizar', 'Cotizar', 'Portafolio'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace('ñ', 'n')}`}
              onClick={() => setIsOpen(false)}
              style={{
                textDecoration: 'none',
                color: 'var(--text-primary)',
                fontWeight: 600,
                fontSize: '1.1rem',
                padding: '8px 0'
              }}
            >
              {item}
            </a>
          ))}
        </div>
      )}

      {/* Global CSS Inject to handle media queries for desktop menu layout */}
      <style>{`
        @media (min-width: 769px) {
          .desktop-menu {
            display: flex !important;
          }
          .mobile-toggle {
            display: none !important;
          }
        }
        .nav-link::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: 0;
          left: 0;
          background: linear-gradient(90deg, var(--primary-pink), var(--light-blue));
          transition: width 0.3s ease;
        }
        .nav-link:hover::after {
          width: 100%;
        }
      `}</style>
    </nav>
  );
}
