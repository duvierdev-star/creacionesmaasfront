import React, { useState } from 'react';
import { ArrowUpRight, Star, Heart, TrendingUp, Shield, Truck } from 'lucide-react';

// Imágenes reales de productos
const productImages = {
  camisetas: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop&crop=center',
  gorras: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&h=600&fit=crop&crop=center',
  mugs: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600&h=600&fit=crop&crop=center',
  cojines: 'https://images.unsplash.com/photo-1691256676366-370303d55b61?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  termos: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&h=600&fit=crop&crop=center',
  agendas: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=600&h=600&fit=crop&crop=center'
};

const categories = [
  {
    id: 'camisetas',
    name: 'Camisetas Personalizadas',
    description: 'Estampado en vinil textil, sublimación y transfer de alta resistencia.',
    price: '$24.900',
    oldPrice: '$32.900',
    rating: 4.8,
    reviews: 156,
    badge: 'Más Vendido',
    badgeType: 'popular',
    color: 'var(--primary-pink)',
    gradient: 'linear-gradient(135deg, #FF1B7E, #FF6B9D)',
    tags: ['DTF', 'Sublimación', 'Vinil'],
    image: productImages.camisetas,
    // Mantenemos el SVG como fallback
    svg: null
  },
  {
    id: 'gorras',
    name: 'Gorras Trucker',
    description: 'Gorras tipo Trucker y planas con tu logotipo o diseño preferido.',
    price: '$18.900',
    oldPrice: null,
    rating: 4.6,
    reviews: 89,
    badge: 'Nuevo',
    badgeType: 'new',
    color: 'var(--secondary-blue)',
    gradient: 'linear-gradient(135deg, #0B4CA0, #4A90D9)',
    tags: ['Bordado', 'Personalizado', 'Unisex'],
    image: productImages.gorras,
    svg: null
  },
  {
    id: 'mugs',
    name: 'Tazas Personalizadas',
    description: 'Tazas de cerámica 11oz, mágicas y metalizadas con tu diseño.',
    price: '$14.900',
    oldPrice: '$19.900',
    rating: 4.9,
    reviews: 234,
    badge: 'Oferta',
    badgeType: 'sale',
    color: 'var(--accent-yellow)',
    gradient: 'linear-gradient(135deg, #FFB500, #FFD700)',
    tags: ['Cerámica', 'Mágica', 'Regalo'],
    image: productImages.mugs,
    svg: null
  },
  {
    id: 'cojines',
    name: 'Cojines Decorativos',
    description: 'Cojines sublimados con fotos familiares y dedicatorias especiales.',
    price: '$29.900',
    oldPrice: null,
    rating: 4.7,
    reviews: 67,
    badge: 'Hogar',
    badgeType: 'default',
    color: 'var(--light-blue)',
    gradient: 'linear-gradient(135deg, #2EB4E7, #7CD4F0)',
    tags: ['Sublimación', 'Fotos', 'Decoración'],
    image: productImages.cojines,
    svg: null
  },
  {
    id: 'termos',
    name: 'Termos Deportivos',
    description: 'Termos de aluminio y botellas deportivas sublimadas con tu nombre.',
    price: '$34.900',
    oldPrice: '$42.900',
    rating: 4.5,
    reviews: 123,
    badge: '-19%',
    badgeType: 'sale',
    color: 'var(--primary-pink)',
    gradient: 'linear-gradient(135deg, #FF1B7E, #FF6B9D)',
    tags: ['Aluminio', 'Deporte', 'Personalizado'],
    image: productImages.termos,
    svg: null
  },
  {
    id: 'agendas',
    name: 'Agendas y Papelería',
    description: 'Libretas anilladas personalizadas, agendas y papelería creativa.',
    price: '$19.900',
    oldPrice: null,
    rating: 4.4,
    reviews: 45,
    badge: 'Oficina',
    badgeType: 'default',
    color: 'var(--secondary-blue)',
    gradient: 'linear-gradient(135deg, #0B4CA0, #4A90D9)',
    tags: ['Papelería', 'Diseño', 'Personalizado'],
    image: productImages.agendas,
    svg: null
  }
];

// Componente de estrellas de rating
const StarRating = ({ rating, reviews }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <div style={{ display: 'flex', gap: '2px' }}>
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} size={14} fill="var(--accent-yellow)" color="var(--accent-yellow)" />
        ))}
        {hasHalfStar && (
          <Star size={14} fill="var(--accent-yellow)" color="var(--accent-yellow)" style={{ opacity: 0.5 }} />
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} size={14} color="var(--border-color)" />
        ))}
      </div>
      <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
        ({reviews})
      </span>
    </div>
  );
};

// Componente de badge según tipo
const ProductBadge = ({ badge, type }) => {
  const badgeStyles = {
    popular: { background: 'var(--primary-pink)', color: 'white' },
    new: { background: 'var(--light-blue)', color: 'white' },
    sale: { background: '#FF4444', color: 'white' },
    default: { background: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }
  };

  const style = badgeStyles[type] || badgeStyles.default;

  return (
    <span
      style={{
        position: 'absolute',
        top: '16px',
        left: '16px',
        background: style.background,
        color: style.color,
        fontSize: '0.7rem',
        fontWeight: 700,
        padding: '4px 12px',
        borderRadius: '20px',
        border: type === 'default' ? '1px solid var(--border-color)' : 'none',
        letterSpacing: '0.5px',
        textTransform: 'uppercase',
        zIndex: 2,
        boxShadow: 'var(--shadow-sm)'
      }}
    >
      {badge}
    </span>
  );
};

export default function CategoryGrid() {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <section 
      id="categorias" 
      style={{ 
        backgroundColor: 'var(--bg-secondary)', 
        padding: '60px 0',
        borderTop: '1px solid var(--border-color)', 
        borderBottom: '1px solid var(--border-color)'
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span 
            style={{ 
              display: 'inline-block',
              background: 'var(--bg-tertiary)',
              padding: '4px 16px',
              borderRadius: '20px',
              fontSize: '0.8rem',
              fontWeight: 600,
              color: 'var(--primary-pink)',
              marginBottom: '12px',
              border: '1px solid var(--border-color)'
            }}
          >
            ✨ Catálogo
          </span>
          <h2 
            style={{ 
              fontSize: '2.5rem', 
              fontWeight: 800, 
              marginBottom: '16px',
              color: 'var(--text-primary)',
              letterSpacing: '-1px'
            }}
          >
            ¿Qué estampamos para ti?
          </h2>
          <p 
            style={{ 
              fontSize: '1.1rem', 
              color: 'var(--text-secondary)',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: 1.6
            }}
          >
            Utilizamos las mejores técnicas para asegurar estampados vivos, 
            duraderos y de la más alta definición en diversos materiales.
          </p>
        </div>

        {/* Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '28px'
          }}
        >
          {categories.map((cat) => (
            <div
              key={cat.id}
              onMouseEnter={() => setHoveredId(cat.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                background: 'var(--bg-primary)',
                borderRadius: '20px',
                border: '1px solid var(--border-color)',
                overflow: 'hidden',
                transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                transform: hoveredId === cat.id ? 'translateY(-8px)' : 'translateY(0)',
                boxShadow: hoveredId === cat.id ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
                cursor: 'pointer',
                position: 'relative'
              }}
            >
              {/* Badge */}
              <ProductBadge badge={cat.badge} type={cat.badgeType} />

              {/* Wishlist button */}
              <button
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  background: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  zIndex: 2,
                  color: 'var(--text-secondary)'
                }}
                onMouseEnter={(e) => { 
                  e.currentTarget.style.color = 'var(--primary-pink)'; 
                  e.currentTarget.style.borderColor = 'var(--primary-pink)';
                  e.currentTarget.style.background = 'white';
                }}
                onMouseLeave={(e) => { 
                  e.currentTarget.style.color = 'var(--text-secondary)'; 
                  e.currentTarget.style.borderColor = 'var(--border-color)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
                }}
              >
                <Heart size={18} />
              </button>

              {/* Image Container */}
              <div
                style={{
                  position: 'relative',
                  paddingTop: '75%',
                  background: cat.splashColor || 'var(--bg-secondary)',
                  overflow: 'hidden'
                }}
              >
                {/* Gradient overlay on hover */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: hoveredId === cat.id 
                      ? 'linear-gradient(to top, rgba(0,0,0,0.2), transparent)' 
                      : 'transparent',
                    transition: 'all 0.3s',
                    zIndex: 1
                  }}
                />
                
                {/* Product Image */}
                <img
                  src={cat.image}
                  alt={cat.name}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    transform: hoveredId === cat.id 
                      ? 'translate(-50%, -50%) scale(1.05)' 
                      : 'translate(-50%, -50%) scale(1)'
                  }}
                  loading="lazy"
                />

                {/* Quick view overlay on hover */}
                {hoveredId === cat.id && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '16px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: 'rgba(0,0,0,0.7)',
                      backdropFilter: 'blur(10px)',
                      padding: '6px 16px',
                      borderRadius: '20px',
                      color: 'white',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      zIndex: 2,
                      animation: 'fadeInUp 0.3s ease'
                    }}
                  >
                    Ver producto
                  </div>
                )}
              </div>

              {/* Content */}
              <div style={{ padding: '20px 20px 24px' }}>
                {/* Title */}
                <h3
                  style={{
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    marginBottom: '8px',
                    color: 'var(--text-primary)',
                    lineHeight: 1.3
                  }}
                >
                  {cat.name}
                </h3>

                {/* Rating */}
                <div style={{ marginBottom: '12px' }}>
                  <StarRating rating={cat.rating} reviews={cat.reviews} />
                </div>

                {/* Price */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    {cat.price}
                  </span>
                  {cat.oldPrice && (
                    <span style={{ fontSize: '1rem', color: 'var(--text-secondary)', textDecoration: 'line-through' }}>
                      {cat.oldPrice}
                    </span>
                  )}
                </div>

                {/* Tags */}
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
                  {cat.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        background: 'var(--bg-secondary)',
                        padding: '2px 10px',
                        borderRadius: '12px',
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        color: 'var(--text-secondary)',
                        border: '1px solid var(--border-color)'
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA Button */}
                <button
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: cat.gradient,
                    border: 'none',
                    borderRadius: '12px',
                    color: 'white',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    transform: hoveredId === cat.id ? 'scale(1.02)' : 'scale(1)',
                    boxShadow: hoveredId === cat.id ? '0 4px 20px rgba(255,27,126,0.3)' : 'none'
                  }}
                  onMouseEnter={(e) => { 
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(255,27,126,0.4)'; 
                  }}
                  onMouseLeave={(e) => { 
                    e.currentTarget.style.boxShadow = hoveredId === cat.id ? '0 4px 20px rgba(255,27,126,0.3)' : 'none'; 
                  }}
                >
                  Personalizar ahora
                  <ArrowUpRight size={18} />
                </button>

                {/* Shipping info */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '12px', justifyContent: 'center' }}>
                  <Truck size={14} color="var(--text-secondary)" />
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                    Envío disponible
                  </span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>•</span>
                  <Shield size={14} color="var(--text-secondary)" />
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                    Garantía incluida
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <a
            href="#personalizar"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '14px 32px',
              background: 'var(--bg-primary)',
              border: '2px solid var(--border-color)',
              borderRadius: '16px',
              color: 'var(--text-primary)',
              fontWeight: 700,
              textDecoration: 'none',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--primary-pink)'; e.currentTarget.style.transform = 'scale(1.05)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.transform = 'scale(1)'; }}
          >
            Ver todos los productos
            <ArrowUpRight size={18} />
          </a>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }
      `}</style>
    </section>
  );
}