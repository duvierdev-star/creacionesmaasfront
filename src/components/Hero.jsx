import React from 'react';
import { ArrowRight, ShoppingBag, ShieldCheck, Truck, Sparkles, CheckCircle2 } from 'lucide-react';
import './hero.css';

export default function Hero() {
  return (
    <header id="inicio" className="hero">
      {/* Decorative Background Elements */}
      <div className="hero-grid-pattern" aria-hidden="true" />
      <div className="hero-blob blob-pink" aria-hidden="true" />
      <div className="hero-blob blob-blue" aria-hidden="true" />
      <div className="hero-blob blob-yellow" aria-hidden="true" />

      <div className="container hero-grid">
        <section className="hero-content">
          <div className="hero-chip-container">
            <span className="hero-chip">
              <Sparkles size={14} className="icon-sparkle" /> Estampados & Sublimación
            </span>
          </div>

          <h1>
            Estampamos tus ideas,
            <br />
            <span className="gradient-text">creamos recuerdos</span>
          </h1>

          <p>
            En <strong>Creaciones MA+AS</strong> personalizamos camisetas,
            mugs, gorras y mucho más con acabados premium y durabilidad garantizada.
          </p>

          <div className="hero-buttons">
            <a href="#personalizar" className="btn btn-primary">
              Cotizar ahora <ArrowRight size={18} />
            </a>

            <a href="#categorias" className="btn btn-secondary">
              Ver catálogo <ShoppingBag size={18} />
            </a>
          </div>

          {/* Trust points */}
          <div className="hero-trust-points">
            <div className="trust-point">
              <CheckCircle2 size={16} className="trust-icon" />
              <span>Garantía de calidad</span>
            </div>
            <div className="trust-point">
              <CheckCircle2 size={16} className="trust-icon" />
              <span>Atención 100% personalizada</span>
            </div>
          </div>
        </section>

        <section className="hero-image-container">
          <div className="hero-glow" aria-hidden="true" />
          
          <div className="image-wrapper">
            <img
              src="/images/modelo-maas.webp"
              alt="MA+AS Creaciones"
              className="hero-image"
              loading="eager"
              fetchPriority="high"
            />
            <div className="image-border-glow" aria-hidden="true" />
          </div>

          {/* Premium Floating Cards with styled icons and micro-details */}
          <div className="glass-panel floating-card card-top animate-float-slow">
            <div className="card-icon-wrapper pink">
              <span>👕</span>
            </div>
            <div className="card-info">
              <span className="card-title">Camisetas</span>
              <span className="card-subtitle">Algodón & Poliéster</span>
            </div>
          </div>

          <div className="glass-panel floating-card card-right animate-float-medium">
            <div className="card-icon-wrapper blue">
              <span>☕</span>
            </div>
            <div className="card-info">
              <span className="card-title">Mugs HD</span>
              <span className="card-subtitle">Cerámica Premium</span>
            </div>
          </div>

          <div className="glass-panel floating-card card-bottom animate-float-fast">
            <div className="card-icon-wrapper yellow">
              <span>🧢</span>
            </div>
            <div className="card-info">
              <span className="card-title">Gorras</span>
              <span className="card-subtitle">Bordado & Vinil</span>
            </div>
          </div>
        </section>
      </div>

      {/* Hero Features Bar at the bottom of the section */}
      <div className="container">
        <div className="hero-features-bar glass-panel animate-fade-in">
          <div className="feature-item">
            <div className="feature-icon-container pink">
              <ShieldCheck size={24} />
            </div>
            <div className="feature-text">
              <h3>Acabados Premium</h3>
              <p>Estampados de alta definición y gran durabilidad al lavado</p>
            </div>
          </div>
          
          <div className="feature-divider" aria-hidden="true" />

          <div className="feature-item">
            <div className="feature-icon-container blue">
              <Truck size={24} />
            </div>
            <div className="feature-text">
              <h3>Envíos Seguros</h3>
              <p>Hacemos llegar tus productos personalizados a todo el país</p>
            </div>
          </div>

          <div className="feature-divider" aria-hidden="true" />

          <div className="feature-item">
            <div className="feature-icon-container yellow">
              <Sparkles size={24} />
            </div>
            <div className="feature-text">
              <h3>Sin Mínimos</h3>
              <p>Estampamos desde una sola unidad para tus regalos o eventos</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
