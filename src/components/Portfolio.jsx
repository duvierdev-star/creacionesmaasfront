import React, { useState } from 'react';
import { Heart, Tag, Eye, Star, Users, Calendar, Award, TrendingUp, Share2, ZoomIn } from 'lucide-react';

const portfolioItems = [
  {
    id: 1,
    title: 'Camisetas Familiares MA+AS',
    category: 'camisetas',
    technique: 'Vinil Textil Premium',
    likes: 124,
    color: '#ff1b7e',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop&crop=center',
    date: '2026-02-15',
    price: '$24.900',
    rating: 4.9,
    reviews: 23,
    featured: true
  },
  {
    id: 2,
    title: 'Mugs Corporativos TecnoSmart',
    category: 'mugs',
    technique: 'Sublimación 8K',
    likes: 89,
    color: '#ffb500',
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600&h=600&fit=crop&crop=center',
    date: '2026-02-10',
    price: '$14.900',
    rating: 4.7,
    reviews: 18,
    featured: false
  },
  {
    id: 3,
    title: 'Gorras de Graduación Prom 2026',
    category: 'gorras',
    technique: 'Estampado Transfer',
    likes: 156,
    color: '#0b4ca0',
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&h=600&fit=crop&crop=center',
    date: '2026-02-08',
    price: '$18.900',
    rating: 4.8,
    reviews: 31,
    featured: true
  },
  {
    id: 4,
    title: 'Cojín Regalo de Aniversario',
    category: 'cojines',
    technique: 'Sublimación Completa',
    likes: 112,
    color: '#2eb4e7',
    image: 'https://images.unsplash.com/photo-1691256676366-370303d55b61?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    date: '2026-02-05',
    price: '$29.900',
    rating: 4.9,
    reviews: 27,
    featured: false
  },
  {
    id: 5,
    title: 'Termos Deportivos Gym Life',
    category: 'termos',
    technique: 'Sublimación Envolvente',
    likes: 95,
    color: '#ff1b7e',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&h=600&fit=crop&crop=center',
    date: '2026-02-01',
    price: '$34.900',
    rating: 4.6,
    reviews: 15,
    featured: false
  },
  {
    id: 6,
    title: 'Agenda Anillada Acuarela',
    category: 'agendas',
    technique: 'Laminado Pasta Dura',
    likes: 143,
    color: '#0b4ca0',
    image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=600&h=600&fit=crop&crop=center',
    date: '2026-01-28',
    price: '$19.900',
    rating: 4.5,
    reviews: 12,
    featured: false
  }
];

// Componente de estrellas de rating
const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div style={{ display: 'flex', gap: '1px' }}>
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} size={12} fill="#ffb500" color="#ffb500" />
      ))}
      {hasHalfStar && (
        <Star size={12} fill="#ffb500" color="#ffb500" style={{ opacity: 0.5 }} />
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} size={12} color="var(--border-color)" />
      ))}
    </div>
  );
};

export default function Portfolio() {
  const [filter, setFilter] = useState('all');
  const [likesState, setLikesState] = useState(
    portfolioItems.reduce((acc, item) => ({ ...acc, [item.id]: item.likes }), {})
  );
  const [userLiked, setUserLiked] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);

  const toggleLike = (id) => {
    if (userLiked[id]) {
      setLikesState(prev => ({ ...prev, [id]: prev[id] - 1 }));
      setUserLiked(prev => ({ ...prev, [id]: false }));
    } else {
      setLikesState(prev => ({ ...prev, [id]: prev[id] + 1 }));
      setUserLiked(prev => ({ ...prev, [id]: true }));
    }
  };

  const filteredItems = filter === 'all'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === filter);

  // Obtener el conteo de items por categoría
  const getCategoryCount = (categoryId) => {
    if (categoryId === 'all') return portfolioItems.length;
    return portfolioItems.filter(item => item.category === categoryId).length;
  };

  return (
    <section id="portafolio" style={{ 
      backgroundColor: 'var(--bg-secondary)', 
      padding: '80px 0',
      position: 'relative'
    }}>
      {/* Background decorative elements */}
      <div style={{
        position: 'absolute',
        top: '-40%',
        left: '-10%',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(255,27,126,0.03), transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none'
      }} />
      
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255,181,0,0.08)',
            padding: '6px 16px 6px 12px',
            borderRadius: '30px',
            marginBottom: '16px',
            border: '1px solid rgba(255,181,0,0.15)'
          }}>
            <Award size={16} color="var(--accent-yellow)" />
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--accent-yellow)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Trabajos Reales
            </span>
          </div>
          <h2 style={{ 
            fontSize: '2.8rem', 
            fontWeight: 800, 
            marginBottom: '16px',
            color: 'var(--text-primary)',
            letterSpacing: '-1.5px',
            lineHeight: 1.1
          }}>
            Nuestra Galería de <span style={{ color: 'var(--primary-pink)' }}>Recuerdos</span>
          </h2>
          <p style={{ 
            fontSize: '1.1rem', 
            color: 'var(--text-secondary)',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: 1.7
          }}>
            Descubre trabajos terminados que hemos entregado a clientes felices.
            Cada pieza cuenta una historia única.
          </p>
        </div>

        {/* Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '20px',
          marginBottom: '40px',
          maxWidth: '800px',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>
          <div style={{
            background: 'var(--bg-primary)',
            padding: '16px',
            borderRadius: '16px',
            border: '1px solid var(--border-color)',
            textAlign: 'center',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary-pink)' }}>
              {portfolioItems.length}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Proyectos realizados</div>
          </div>
          <div style={{
            background: 'var(--bg-primary)',
            padding: '16px',
            borderRadius: '16px',
            border: '1px solid var(--border-color)',
            textAlign: 'center',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-yellow)' }}>
              {portfolioItems.reduce((acc, item) => acc + item.likes, 0)}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Interacciones totales</div>
          </div>
          <div style={{
            background: 'var(--bg-primary)',
            padding: '16px',
            borderRadius: '16px',
            border: '1px solid var(--border-color)',
            textAlign: 'center',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--light-blue)' }}>
              {portfolioItems.filter(item => item.featured).length}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Destacados</div>
          </div>
          <div style={{
            background: 'var(--bg-primary)',
            padding: '16px',
            borderRadius: '16px',
            border: '1px solid var(--border-color)',
            textAlign: 'center',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#34d399' }}>
              4.8
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Calificación promedio</div>
          </div>
        </div>

        {/* FILTER BUTTONS */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '10px',
          marginBottom: '40px'
        }}>
          {[
            { id: 'all', name: 'Todos' },
            { id: 'camisetas', name: 'Camisetas' },
            { id: 'mugs', name: 'Mugs' },
            { id: 'gorras', name: 'Gorras' },
            { id: 'cojines', name: 'Cojines' },
            { id: 'termos', name: 'Termos' },
            { id: 'agendas', name: 'Agendas' }
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => setFilter(btn.id)}
              style={{
                padding: '10px 22px',
                borderRadius: '30px',
                border: filter === btn.id ? '2px solid var(--primary-pink)' : '1px solid var(--border-color)',
                background: filter === btn.id ? 'var(--primary-pink)' : 'var(--bg-primary)',
                color: filter === btn.id ? 'white' : 'var(--text-primary)',
                fontWeight: filter === btn.id ? 700 : 600,
                fontSize: '0.85rem',
                cursor: 'pointer',
                boxShadow: filter === btn.id ? '0 4px 16px rgba(255, 27, 126, 0.3)' : 'var(--shadow-sm)',
                transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transform: filter === btn.id ? 'scale(1.05)' : 'scale(1)'
              }}
              onMouseEnter={(e) => { 
                if (filter !== btn.id) {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.borderColor = 'var(--primary-pink)';
                }
              }}
              onMouseLeave={(e) => { 
                if (filter !== btn.id) {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.borderColor = 'var(--border-color)';
                }
              }}
            >
              {btn.name}
              <span style={{
                fontSize: '0.7rem',
                opacity: 0.7,
                background: filter === btn.id ? 'rgba(255,255,255,0.2)' : 'var(--bg-secondary)',
                padding: '2px 8px',
                borderRadius: '12px'
              }}>
                {getCategoryCount(btn.id)}
              </span>
            </button>
          ))}
        </div>

        {/* PORTFOLIO GRID */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '28px'
          }}
        >
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="portfolio-card"
              style={{
                background: 'var(--bg-primary)',
                borderRadius: '20px',
                border: '1px solid var(--border-color)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}
              onMouseEnter={(e) => { 
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                e.currentTarget.style.borderColor = `rgba(255, 27, 126, 0.2)`;
              }}
              onMouseLeave={(e) => { 
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                e.currentTarget.style.borderColor = 'var(--border-color)';
              }}
            >
              {/* Featured Badge */}
              {item.featured && (
                <div style={{
                  position: 'absolute',
                  top: '16px',
                  left: '16px',
                  background: 'linear-gradient(135deg, #FF1B7E, #FF6B9D)',
                  color: 'white',
                  padding: '4px 14px',
                  borderRadius: '20px',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  zIndex: 2,
                  boxShadow: '0 4px 12px rgba(255,27,126,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <TrendingUp size={12} />
                  Destacado
                </div>
              )}

              {/* Image Container */}
              <div
                style={{
                  height: '260px',
                  position: 'relative',
                  overflow: 'hidden',
                  background: 'var(--bg-secondary)',
                  cursor: 'pointer'
                }}
                onClick={() => setSelectedImage(item)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
                  }}
                  className="portfolio-image"
                  loading="lazy"
                />
                
                {/* Category tag overlay */}
                <div style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  background: 'rgba(0,0,0,0.7)',
                  backdropFilter: 'blur(10px)',
                  padding: '4px 12px',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '0.65rem',
                  fontWeight: 600,
                  color: 'white',
                  border: '1px solid rgba(255,255,255,0.1)',
                  zIndex: 2
                }}>
                  <Tag size={10} color={item.color} />
                  {item.category.toUpperCase()}
                </div>

                {/* Hover overlay */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '40px 20px 20px',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    zIndex: 1
                  }}
                  className="portfolio-overlay"
                >
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <span style={{
                      background: 'rgba(255,255,255,0.2)',
                      backdropFilter: 'blur(10px)',
                      padding: '6px 12px',
                      borderRadius: '8px',
                      color: 'white',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <ZoomIn size={14} />
                      Ver detalle
                    </span>
                  </div>
                  <span style={{
                    background: 'rgba(255,255,255,0.2)',
                    backdropFilter: 'blur(10px)',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <Share2 size={14} />
                    Compartir
                  </span>
                </div>
              </div>

              {/* Content Details */}
              <div style={{ padding: '20px', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
                    <h3 style={{ 
                      fontSize: '1.05rem', 
                      fontWeight: 700, 
                      color: 'var(--text-primary)',
                      lineHeight: 1.3
                    }}>
                      {item.title}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <StarRating rating={item.rating} />
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                        ({item.reviews})
                      </span>
                    </div>
                  </div>
                  
                  {/* Likes action */}
                  <button
                    onClick={() => toggleLike(item.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '2px',
                      color: userLiked[item.id] ? 'var(--primary-pink)' : 'var(--text-secondary)',
                      fontWeight: 700,
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                      padding: '4px 8px',
                      borderRadius: '8px',
                      transition: 'all 0.2s',
                      minWidth: '40px'
                    }}
                    onMouseEnter={(e) => { 
                      e.currentTarget.style.background = 'rgba(255,27,126,0.05)';
                    }}
                    onMouseLeave={(e) => { 
                      e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    <Heart 
                      size={18} 
                      fill={userLiked[item.id] ? 'var(--primary-pink)' : 'none'} 
                      style={{
                        transition: 'transform 0.2s',
                        transform: userLiked[item.id] ? 'scale(1.1)' : 'scale(1)'
                      }}
                    />
                    <span style={{ fontSize: '0.7rem', fontWeight: 600 }}>
                      {likesState[item.id]}
                    </span>
                  </button>
                </div>

                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  paddingTop: '12px',
                  borderTop: '1px solid var(--border-color)'
                }}>
                  <div>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                      Técnica
                    </span>
                    <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                      {item.technique}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                      Desde
                    </span>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--primary-pink)' }}>
                      {item.price}
                    </div>
                  </div>
                </div>

                <button
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '12px',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                  onMouseEnter={(e) => { 
                    e.currentTarget.style.background = 'var(--primary-pink)';
                    e.currentTarget.style.color = 'white';
                    e.currentTarget.style.borderColor = 'var(--primary-pink)';
                  }}
                  onMouseLeave={(e) => { 
                    e.currentTarget.style.background = 'var(--bg-secondary)';
                    e.currentTarget.style.color = 'var(--text-primary)';
                    e.currentTarget.style.borderColor = 'var(--border-color)';
                  }}
                >
                  <Eye size={16} />
                  Ver proyecto
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            background: 'var(--bg-primary)',
            borderRadius: '20px',
            border: '2px dashed var(--border-color)'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🔍</div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
              No hay proyectos en esta categoría
            </h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              Prueba seleccionar otra categoría o ver todos los proyectos.
            </p>
          </div>
        )}

        {/* Lightbox Modal */}
        {selectedImage && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.85)',
              backdropFilter: 'blur(20px)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '40px',
              animation: 'fadeIn 0.3s ease'
            }}
            onClick={() => setSelectedImage(null)}
          >
            <div style={{
              maxWidth: '800px',
              width: '100%',
              maxHeight: '90vh',
              position: 'relative',
              background: 'var(--bg-primary)',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 40px 80px rgba(0,0,0,0.5)'
            }}>
              <button
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  background: 'rgba(0,0,0,0.7)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  color: 'white',
                  fontSize: '20px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 10
                }}
                onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--primary-pink)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(0,0,0,0.7)'; }}
              >
                ✕
              </button>
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '70vh',
                  objectFit: 'contain',
                  display: 'block'
                }}
              />
              <div style={{
                padding: '24px',
                background: 'var(--bg-primary)',
                borderTop: '1px solid var(--border-color)'
              }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
                  {selectedImage.title}
                </h3>
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  <span>Técnica: {selectedImage.technique}</span>
                  <span>•</span>
                  <span>Categoría: {selectedImage.category}</span>
                  <span>•</span>
                  <span>Desde: {selectedImage.price}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }

        .portfolio-card:hover .portfolio-overlay {
          opacity: 1 !important;
        }
        
        .portfolio-card:hover .portfolio-image {
          transform: scale(1.05);
        }

        @media (max-width: 640px) {
          .section-title {
            font-size: 2rem !important;
          }
        }
      `}</style>
    </section>
  );
}