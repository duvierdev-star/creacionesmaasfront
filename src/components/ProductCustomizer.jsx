import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Palette, Type, Smile, Heart, Check, ArrowRight, 
  ShoppingBag, RotateCcw, Download, Share2, Zap, 
  Shield, Truck, Star, Layers, Eye, Maximize2,
  Minus, Plus, RefreshCw
} from 'lucide-react';

const products = [
  { id: 'camiseta', name: 'Camiseta', price: 24900, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=800&fit=crop&crop=center' },
  { id: 'mug', name: 'Mug / Taza', price: 14900, image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800&h=800&fit=crop&crop=center' },
  { id: 'gorra', name: 'Gorra', price: 18900, image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&h=800&fit=crop&crop=center' },
  { id: 'cojin', name: 'Cojín', price: 29900, image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e6?w=800&h=800&fit=crop&crop=center' }
];

const colors = [
  { name: 'Blanco', hex: '#ffffff', textColor: '#1a1a1a' },
  { name: 'Negro', hex: '#1a1a1a', textColor: '#ffffff' },
  { name: 'Rosa Pastel', hex: '#fce4ec', textColor: '#1a1a1a' },
  { name: 'Azul Real', hex: '#1a56db', textColor: '#ffffff' },
  { name: 'Rojo Pasión', hex: '#dc2626', textColor: '#ffffff' },
  { name: 'Gris Melange', hex: '#d1d5db', textColor: '#1a1a1a' },
  { name: 'Verde Menta', hex: '#34d399', textColor: '#1a1a1a' },
  { name: 'Lavanda', hex: '#a78bfa', textColor: '#ffffff' }
];

const fonts = [
  { id: 'outfit', name: 'Outfit', style: "'Outfit', sans-serif", weight: 800 },
  { id: 'cursive', name: 'Cursiva', style: "'Brush Script MT', cursive", weight: 400 },
  { id: 'serif', name: 'Clásico', style: "'Georgia', serif", weight: 700 },
  { id: 'impact', name: 'Impact', style: "'Impact', sans-serif", weight: 900 },
  { id: 'inter', name: 'Inter', style: "'Inter', sans-serif", weight: 700 }
];

const graphics = [
  { id: 'none', name: 'Ninguno', emoji: '✕' },
  { id: 'heart', name: 'Corazón', emoji: '❤️' },
  { id: 'star', name: 'Estrella', emoji: '⭐' },
  { id: 'crown', name: 'Corona', emoji: '👑' },
  { id: 'smile', name: 'Carita', emoji: '😊' },
  { id: 'fire', name: 'Fuego', emoji: '🔥' },
  { id: 'rocket', name: 'Cohete', emoji: '🚀' }
];

const presets = [
  { name: 'Minimalista', text: 'LESS IS MORE', color: '#000000', font: 'outfit', graphic: 'none' },
  { name: 'Romántico', text: 'AMOR ETERNO', color: '#ff1b7e', font: 'cursive', graphic: 'heart' },
  { name: 'Deportivo', text: 'GO HARD', color: '#1a56db', font: 'impact', graphic: 'fire' },
  { name: 'Lujo', text: 'ÉLITE', color: '#d4af37', font: 'serif', graphic: 'crown' },
  { name: 'Fiesta', text: 'PARTY TIME', color: '#dc2626', font: 'outfit', graphic: 'star' }
];

export default function ProductCustomizer({ onQuoteSelect }) {
  const [selectedProduct, setSelectedProduct] = useState('camiseta');
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [customText, setCustomText] = useState('Mi Estampado');
  const [selectedFont, setSelectedFont] = useState(fonts[0]);
  const [textColor, setTextColor] = useState('#ff1b7e');
  const [selectedGraphic, setSelectedGraphic] = useState('heart');
  const [textSize, setTextSize] = useState(2.8);
  const [isHovering, setIsHovering] = useState(false);
  const [showZoom, setShowZoom] = useState(false);
  const [activePreset, setActivePreset] = useState(null);

  // Auto-apply preset
  const applyPreset = (preset) => {
    setCustomText(preset.text);
    setTextColor(preset.color);
    setSelectedFont(fonts.find(f => f.id === preset.font) || fonts[0]);
    setSelectedGraphic(preset.graphic);
    setActivePreset(preset.name);
  };

  const handleQuoteClick = () => {
    const customConfig = {
      product: selectedProduct,
      color: selectedColor.name,
      text: customText,
      font: selectedFont.name,
      textColor: textColor,
      graphic: selectedGraphic
    };
    if (onQuoteSelect) {
      onQuoteSelect(customConfig);
    }
    const element = document.getElementById('cotizar');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const currentProductInfo = products.find(p => p.id === selectedProduct);

  // Render product preview
  const renderProductPreview = () => {
    const product = products.find(p => p.id === selectedProduct);
    const graphicObj = graphics.find(g => g.id === selectedGraphic);
    const hasGraphic = selectedGraphic !== 'none';

    return (
      <div 
        style={{ 
          position: 'relative', 
          width: '100%', 
          maxWidth: '400px', 
          margin: '0 auto',
          borderRadius: '24px',
          overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
          background: 'var(--bg-primary)',
          cursor: 'pointer'
        }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onClick={() => setShowZoom(!showZoom)}
      >
        {/* Product Image Container */}
        <div style={{ position: 'relative', paddingTop: '100%', background: 'var(--bg-secondary)' }}>
          <img
            src={product.image}
            alt={product.name}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
              transform: isHovering ? 'scale(1.05)' : 'scale(1)'
            }}
            loading="lazy"
          />
          
          {/* Color Overlay with Blend Mode */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: selectedColor.hex,
              opacity: selectedColor.hex === '#ffffff' ? 0.05 : 0.3,
              mixBlendMode: 'color',
              pointerEvents: 'none',
              transition: 'opacity 0.4s ease'
            }}
          />

          {/* Design Overlay */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              pointerEvents: 'none',
              width: '85%',
              zIndex: 2,
              filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.15))'
            }}
          >
            {/* Graphic */}
            {hasGraphic && (
              <div style={{ 
                fontSize: `${textSize * 1.8}rem`, 
                marginBottom: '4px', 
                lineHeight: 1,
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
                transform: isHovering ? 'scale(1.05)' : 'scale(1)',
                transition: 'transform 0.3s ease'
              }}>
                {graphicObj.emoji}
              </div>
            )}
            
            {/* Text */}
            <div
              style={{
                color: textColor,
                fontFamily: selectedFont.style,
                fontSize: `${textSize}rem`,
                fontWeight: selectedFont.weight || 800,
                textShadow: ['#ffffff', '#fce4ec', '#fbcfe8', '#d1d5db'].includes(selectedColor.hex)
                  ? '0 2px 8px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.08)'
                  : '0 2px 8px rgba(0,0,0,0.3), 0 4px 16px rgba(0,0,0,0.2)',
                lineHeight: 1.2,
                wordBreak: 'break-word',
                maxWidth: '100%',
                letterSpacing: '0.02em',
                transition: 'all 0.3s ease'
              }}
            >
              {customText}
            </div>
          </div>

          {/* Gradient overlay */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              height: '40%',
              background: 'linear-gradient(to top, rgba(0,0,0,0.3), transparent)',
              pointerEvents: 'none',
              opacity: isHovering ? 1 : 0.6,
              transition: 'opacity 0.4s ease'
            }}
          />

          {/* Hover Zoom Indicator */}
          {isHovering && (
            <div
              style={{
                position: 'absolute',
                bottom: '20px',
                right: '20px',
                background: 'rgba(255,255,255,0.9)',
                backdropFilter: 'blur(10px)',
                padding: '8px 12px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.7rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                zIndex: 3
              }}
            >
              <Maximize2 size={14} />
              Zoom
            </div>
          )}
        </div>

        {/* Product Info Badge */}
        <div
          style={{
            position: 'absolute',
            bottom: '16px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(0,0,0,0.75)',
            backdropFilter: 'blur(16px)',
            padding: '8px 20px',
            borderRadius: '30px',
            color: 'white',
            fontSize: '0.7rem',
            fontWeight: 600,
            letterSpacing: '0.5px',
            textTransform: 'uppercase',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            border: '1px solid rgba(255,255,255,0.1)',
            zIndex: 3,
            transition: 'all 0.3s ease'
          }}
        >
          <ShoppingBag size={14} />
          {product.name}
          <span style={{ opacity: 0.5 }}>•</span>
          <span style={{ color: '#34d399' }}>${product.price.toLocaleString()}</span>
        </div>

        {/* Zoom Modal */}
        {showZoom && (
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
              cursor: 'pointer',
              animation: 'fadeIn 0.3s ease'
            }}
            onClick={() => setShowZoom(false)}
          >
            <div style={{ maxWidth: '80vw', maxHeight: '80vh', position: 'relative' }}>
              <img
                src={product.image}
                alt={product.name}
                style={{
                  maxWidth: '100%',
                  maxHeight: '80vh',
                  objectFit: 'contain',
                  borderRadius: '12px',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.5)'
                }}
              />
              <button
                style={{
                  position: 'absolute',
                  top: '-60px',
                  right: 0,
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '50%',
                  width: '48px',
                  height: '48px',
                  color: 'white',
                  fontSize: '24px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onClick={(e) => { e.stopPropagation(); setShowZoom(false); }}
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <section id="personalizar" style={{ 
      backgroundColor: 'var(--bg-secondary)', 
      padding: '80px 0',
      position: 'relative'
    }}>
      {/* Background decorative elements */}
      <div style={{
        position: 'absolute',
        top: '-50%',
        right: '-20%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(255,27,126,0.05), transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-30%',
        left: '-10%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(11,76,160,0.05), transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none'
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255,27,126,0.08)',
            padding: '6px 16px 6px 12px',
            borderRadius: '30px',
            marginBottom: '16px',
            border: '1px solid rgba(255,27,126,0.15)'
          }}>
            <Sparkles size={16} color="var(--primary-pink)" />
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--primary-pink)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Diseña en tiempo real
            </span>
          </div>
          <h2 style={{ 
            fontSize: '3rem', 
            fontWeight: 800, 
            marginBottom: '16px',
            color: 'var(--text-primary)',
            letterSpacing: '-1.5px',
            lineHeight: 1.1
          }}>
            Personaliza tu <span style={{ color: 'var(--primary-pink)' }}>producto</span>
          </h2>
          <p style={{ 
            fontSize: '1.1rem', 
            color: 'var(--text-secondary)',
            maxWidth: '560px',
            margin: '0 auto',
            lineHeight: 1.7
          }}>
            Experimenta con diferentes estilos, colores y diseños antes de estampar.
            Resultados profesionales garantizados.
          </p>
        </div>

        {/* Main Customizer */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.2fr',
            gap: '40px',
            background: 'var(--bg-primary)',
            borderRadius: '32px',
            border: '1px solid var(--border-color)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
            overflow: 'hidden',
            padding: '40px'
          }}
        >
          {/* LEFT COLUMN: PREVIEW */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-start',
              background: 'var(--bg-secondary)',
              borderRadius: '24px',
              padding: '30px 20px',
              border: '1px solid var(--border-color)',
              position: 'relative'
            }}
          >
            {/* Preview Label */}
            <div style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <span style={{
                fontSize: '0.8rem',
                fontWeight: 700,
                color: 'var(--text-secondary)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <Eye size={16} /> Vista Previa
              </span>
              <button
                style={{
                  background: 'var(--bg-primary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  padding: '4px 12px',
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  transition: 'all 0.2s'
                }}
                onClick={() => setShowZoom(true)}
              >
                <Maximize2 size={12} />
                Ampliar
              </button>
            </div>

            {/* Product Preview */}
            {renderProductPreview()}

            {/* Quick Stats */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '12px',
              width: '100%',
              marginTop: '24px',
              paddingTop: '20px',
              borderTop: '1px solid var(--border-color)'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {colors.length}
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Colores</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {fonts.length}
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Fuentes</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {graphics.length - 1}
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Iconos</div>
              </div>
            </div>

            {/* Trust Badges */}
            <div style={{
              display: 'flex',
              gap: '16px',
              marginTop: '16px',
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.65rem', color: 'var(--text-secondary)' }}>
                <Shield size={12} /> Garantía de calidad
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.65rem', color: 'var(--text-secondary)' }}>
                <Truck size={12} /> Envío express
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.65rem', color: 'var(--text-secondary)' }}>
                <Star size={12} /> 4.9/5 valoración
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: CONTROLS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {/* Presets */}
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Zap size={16} color="var(--accent-yellow)" /> Diseños predeterminados
              </label>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {presets.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => applyPreset(preset)}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '20px',
                      border: activePreset === preset.name ? '2px solid var(--primary-pink)' : '1px solid var(--border-color)',
                      background: activePreset === preset.name ? 'rgba(255,27,126,0.05)' : 'var(--bg-secondary)',
                      color: activePreset === preset.name ? 'var(--primary-pink)' : 'var(--text-secondary)',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>

            {/* 1. SELECT PRODUCT */}
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px', display: 'block' }}>
                1. Elige el producto
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                {products.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedProduct(p.id)}
                    style={{
                      padding: '14px 12px',
                      borderRadius: '14px',
                      border: selectedProduct === p.id ? '2px solid var(--primary-pink)' : '1px solid var(--border-color)',
                      background: selectedProduct === p.id ? 'rgba(255,27,126,0.04)' : 'var(--bg-secondary)',
                      color: selectedProduct === p.id ? 'var(--primary-pink)' : 'var(--text-primary)',
                      fontWeight: selectedProduct === p.id ? 700 : 500,
                      cursor: 'pointer',
                      fontSize: '0.85rem',
                      textAlign: 'center',
                      transition: 'all 0.2s',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <span>{p.name}</span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>${p.price.toLocaleString()}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. SELECT COLOR */}
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px', display: 'block' }}>
                2. Color de base
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c)}
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      background: c.hex,
                      border: selectedColor.name === c.name ? '3px solid var(--primary-pink)' : '2px solid var(--border-color)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: 'var(--shadow-sm)',
                      transition: 'transform 0.2s, border-color 0.2s, box-shadow 0.2s',
                      transform: selectedColor.name === c.name ? 'scale(1.1)' : 'scale(1)',
                      boxShadow: selectedColor.name === c.name ? '0 4px 16px rgba(255,27,126,0.3)' : 'var(--shadow-sm)'
                    }}
                    title={c.name}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; }}
                    onMouseLeave={(e) => { 
                      if (selectedColor.name !== c.name) {
                        e.currentTarget.style.transform = 'scale(1)'; 
                      }
                    }}
                  >
                    {selectedColor.name === c.name && (
                      <Check
                        size={18}
                        color={c.hex === '#ffffff' || c.hex === '#fce4ec' || c.hex === '#d1d5db' ? '#000000' : '#ffffff'}
                        strokeWidth={3}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. TEXT AND STYLE */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Type size={16} /> 3. Texto
                </label>
                <input
                  type="text"
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value.substring(0, 30))}
                  maxLength={30}
                  placeholder="Escribe aquí..."
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    fontFamily: selectedFont.style,
                    fontSize: '1rem',
                    fontWeight: selectedFont.weight || 600,
                    outline: 'none',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.2s, box-shadow 0.2s'
                  }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--primary-pink)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(255,27,126,0.1)'; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.boxShadow = 'none'; }}
                />
                <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '4px', textAlign: 'right' }}>
                  {customText.length}/30
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px', display: 'block' }}>
                  Tamaño
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    onClick={() => setTextSize(Math.max(1.5, textSize - 0.3))}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      border: '1px solid var(--border-color)',
                      background: 'var(--bg-secondary)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--text-primary)'
                    }}
                  >
                    <Minus size={14} />
                  </button>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, minWidth: '40px', textAlign: 'center', color: 'var(--text-primary)' }}>
                    {textSize.toFixed(1)}
                  </span>
                  <button
                    onClick={() => setTextSize(Math.min(4.5, textSize + 0.3))}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      border: '1px solid var(--border-color)',
                      background: 'var(--bg-secondary)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--text-primary)'
                    }}
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* 4. FONT & COLOR */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px', display: 'block' }}>
                  Fuente
                </label>
                <select
                  value={selectedFont.id}
                  onChange={(e) => setSelectedFont(fonts.find(f => f.id === e.target.value))}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '12px',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    fontSize: '0.9rem',
                    outline: 'none',
                    cursor: 'pointer',
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--primary-pink)'; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--border-color)'; }}
                >
                  {fonts.map((f) => (
                    <option key={f.id} value={f.id} style={{ fontFamily: f.style }}>
                      {f.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Palette size={16} /> Color
                </label>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', height: '48px' }}>
                  <input
                    type="color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    style={{
                      border: '2px solid var(--border-color)',
                      width: '48px',
                      height: '100%',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      background: 'none',
                      padding: 0,
                      transition: 'border-color 0.2s'
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--primary-pink)'; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--border-color)'; }}
                    title="Elegir color personalizado"
                  />
                  <span style={{ 
                    fontSize: '0.8rem', 
                    fontWeight: 600, 
                    color: 'var(--text-secondary)',
                    background: 'var(--bg-secondary)',
                    padding: '8px 14px',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    flex: 1,
                    textAlign: 'center'
                  }}>
                    {textColor.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>

            {/* 5. GRAPHIC */}
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Smile size={16} /> 5. Icono
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {graphics.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => setSelectedGraphic(g.id)}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '10px',
                      border: selectedGraphic === g.id ? '2px solid var(--primary-pink)' : '1px solid var(--border-color)',
                      background: selectedGraphic === g.id ? 'rgba(255,27,126,0.05)' : 'var(--bg-secondary)',
                      color: selectedGraphic === g.id ? 'var(--primary-pink)' : 'var(--text-secondary)',
                      fontWeight: selectedGraphic === g.id ? 700 : 500,
                      cursor: 'pointer',
                      fontSize: '0.8rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      transition: 'all 0.2s'
                    }}
                  >
                    {g.id !== 'none' && <span style={{ fontSize: '1.1rem' }}>{g.emoji}</span>}
                    {g.name}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '12px', marginTop: '8px' }}>
              <button
                onClick={handleQuoteClick}
                style={{
                  padding: '16px 24px',
                  background: 'linear-gradient(135deg, #FF1B7E, #FF6B9D)',
                  border: 'none',
                  borderRadius: '14px',
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  boxShadow: '0 8px 24px rgba(255,27,126,0.3)'
                }}
                onMouseEnter={(e) => { 
                  e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)'; 
                  e.currentTarget.style.boxShadow = '0 12px 36px rgba(255,27,126,0.4)';
                }}
                onMouseLeave={(e) => { 
                  e.currentTarget.style.transform = 'translateY(0) scale(1)'; 
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(255,27,126,0.3)';
                }}
              >
                <ShoppingBag size={20} />
                Cotizar diseño
                <ArrowRight size={18} />
              </button>
              <button
                style={{
                  padding: '16px 20px',
                  borderRadius: '14px',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-secondary)',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-secondary)'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--text-primary)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                onClick={() => {
                  setCustomText('Mi Estampado');
                  setTextColor('#ff1b7e');
                  setSelectedFont(fonts[0]);
                  setSelectedGraphic('heart');
                  setTextSize(2.8);
                  setActivePreset(null);
                }}
              >
                <RefreshCw size={20} />
              </button>
            </div>

            <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textAlign: 'center', marginTop: '4px' }}>
              ⚡ Obtén tu cotización personalizada en menos de 2 minutos
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }

        @media (max-width: 1024px) {
          .main-customizer {
            grid-template-columns: 1fr !important;
            padding: 24px !important;
          }
        }

        @media (max-width: 640px) {
          .section-title {
            font-size: 2rem !important;
          }
          .controls-grid {
            grid-template-columns: 1fr !important;
          }
          .presets-grid {
            flex-wrap: wrap;
          }
        }
      `}</style>
    </section>
  );
}