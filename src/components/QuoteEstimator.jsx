import React, { useState, useEffect } from 'react';
import { ShoppingCart, Send, Info, Award, HelpCircle, Sparkles, Gift, Clock, Truck, Shield } from 'lucide-react';

const basePrices = {
  camiseta: 12000,
  mug: 8000,
  gorra: 9500,
  cojin: 11000,
  termos: 14000,
  agendas: 15000
};

const productDetails = {
  camiseta: {
    label: '👕 Camiseta (Estampada)',
    emoji: '👕',
    options: ['S', 'M', 'L', 'XL', 'Niño (Talla 4-16)'],
    techniques: ['Estampado Pecho', 'Estampado Espalda', 'Estampado Ambos Lados']
  },
  mug: {
    label: '☕ Mug / Taza',
    emoji: '☕',
    options: ['Cerámica Blanca (11oz)', 'Mug Mágico (Cambia con calor)', 'Mug Metalizado (Dorado/Plata)'],
    techniques: ['Sublimación Estándar']
  },
  gorra: {
    label: '🧢 Gorra Trucker',
    emoji: '🧢',
    options: ['Ajustable Estándar'],
    techniques: ['Estampado Frontal']
  },
  cojin: {
    label: '🛋️ Cojín Decorativo',
    emoji: '🛋️',
    options: ['Cuadrado (40x40cm)', 'Forma de Corazón'],
    techniques: ['Sublimación Frontal', 'Sublimación Doble Cara']
  },
  termos: {
    label: '🧴 Termo / Botella Deportiva',
    emoji: '🧴',
    options: ['Aluminio Blanco (600ml)', 'Aluminio Plateado (600ml)', 'Termo Térmico Premium'],
    techniques: ['Sublimación Envolvente']
  },
  agendas: {
    label: '📒 Agenda / Libreta Anillada',
    emoji: '📒',
    options: ['Pasta Dura A5', 'Pasta Flexible A5'],
    techniques: ['Portada Personalizada']
  }
};

export default function QuoteEstimator({ prefill }) {
  const [product, setProduct] = useState('camiseta');
  const [quantity, setQuantity] = useState(1);
  const [sizeOption, setSizeOption] = useState('');
  const [technique, setTechnique] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [notes, setNotes] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('573013376768');
  
  const [hasCustomDesign, setHasCustomDesign] = useState(false);
  const [customDesignDetails, setCustomDesignDetails] = useState(null);

  useEffect(() => {
    if (prefill) {
      setProduct(prefill.product);
      setHasCustomDesign(true);
      setCustomDesignDetails({
        color: prefill.color,
        text: prefill.text,
        font: prefill.font,
        textColor: prefill.textColor,
        graphic: prefill.graphic
      });
      const details = productDetails[prefill.product];
      if (details) {
        setSizeOption(details.options[0]);
        setTechnique(details.techniques[0]);
      }
    }
  }, [prefill]);

  useEffect(() => {
    const details = productDetails[product];
    if (details && (!prefill || prefill.product !== product)) {
      setSizeOption(details.options[0]);
      setTechnique(details.techniques[0]);
    }
  }, [product]);

  const calculatePrice = () => {
    const basePrice = basePrices[product] || 10000;
    let extraCost = 0;
    if (technique && technique.includes('Ambos')) extraCost += 4000;
    if (sizeOption && sizeOption.includes('Mágico')) extraCost += 3000;
    if (sizeOption && sizeOption.includes('Térmico Premium')) extraCost += 8000;

    const unitPrice = basePrice + extraCost;
    const subtotal = unitPrice * quantity;

    let discountPercent = 0;
    if (quantity >= 12 && quantity < 50) {
      discountPercent = 10;
    } else if (quantity >= 50) {
      discountPercent = 20;
    }

    const discountAmount = (subtotal * discountPercent) / 100;
    const total = subtotal - discountAmount;

    return {
      unitPrice,
      subtotal,
      discountPercent,
      discountAmount,
      total
    };
  };

  const pricing = calculatePrice();

// Función mejorada para generar mensaje con formato limpio para WhatsApp
const generateWhatsAppMessage = () => {
  const divider = "━━━━━━━━━━━━━━━━━━━━";
  const productEmoji = productDetails[product]?.emoji || '🎨';
  
  // Tiempo estimado de entrega
  const estimatedDays = quantity >= 50 ? '5-7' : quantity >= 12 ? '3-5' : '2-3';

  // Diseño del simulador
  const designStr = hasCustomDesign && customDesignDetails
    ? `
🎨 *Diseño*
▸ Texto: "${customDesignDetails.text}"
▸ Color producto: ${customDesignDetails.color}
▸ Color texto: ${customDesignDetails.textColor}
▸ Fuente: ${customDesignDetails.font}
▸ Icono: ${customDesignDetails.graphic !== 'none' ? '❤️ ' + customDesignDetails.graphic : '❌ Ninguno'}`
    : `
🎨 *Diseño*
▸ Enviaré mi diseño en JPG/PNG por este chat.`;

  // Notas adicionales
  const notesStr = notes.trim() ? `
💬 *Notas adicionales*
▸ ${notes}` : '';

  // Construir el mensaje SIN emojis especiales que puedan fallar
  const message = `
*CREACIONES MA+AS*

${divider}

Hola, soy *${customerName || "Cliente"}*.

*Producto*
${productEmoji} ${productDetails[product].label}

*Talla*
${sizeOption}

*Estampado*
${technique}

*Cantidad*
${quantity} unidades

${designStr}

${notesStr}

${divider}

*RESUMEN*

Precio unitario:
*$${pricing.unitPrice.toLocaleString('es-CO')}*

Subtotal:
*$${pricing.subtotal.toLocaleString('es-CO')}*

Descuento:
${pricing.discountPercent}%

*TOTAL*
*$${pricing.total.toLocaleString('es-CO')} COP*

${divider}

*Entrega*
${estimatedDays} dias habiles

Calidad garantizada
Produccion rapida

Gracias por contactarnos.
`.trim();

  return message;
};

// Función para enviar por WhatsApp con codificación correcta
const sendWhatsAppOrder = () => {
  // Generar el mensaje
  const message = generateWhatsAppMessage();
  
  // Codificar correctamente para URL
  const encodedMessage = encodeURIComponent(message);
  
  // Crear URL de WhatsApp
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
  
  // Abrir en nueva ventana
  window.open(whatsappUrl, '_blank');
};

  const copyMessageToClipboard = () => {
    const message = generateWhatsAppMessage();
    navigator.clipboard.writeText(message).then(() => {
      alert('✅ Mensaje copiado al portapapeles. ¡Pégalo en WhatsApp!');
    }).catch(() => {
      alert('❌ No se pudo copiar. Por favor, copia manualmente.');
    });
  };

  return (
    <section id="cotizar" style={{ backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', padding: '60px 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        <div className="section-header" style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span className="section-tag" style={{ 
            display: 'inline-block',
            background: 'rgba(255, 27, 126, 0.1)',
            color: 'var(--primary-pink)',
            padding: '4px 16px',
            borderRadius: '20px',
            fontSize: '0.8rem',
            fontWeight: 600,
            marginBottom: '12px'
          }}>
            💰 Cotizador
          </span>
          <h2 className="section-title" style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '16px', color: 'var(--text-primary)' }}>
            Calcula tu Presupuesto
          </h2>
          <p className="section-subtitle" style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            Elige la cantidad y especificaciones de tu pedido. ¡Automáticamente aplicamos descuentos para pedidos al por mayor!
          </p>
        </div>

        <div
          className="glass-panel"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '40px',
            padding: '40px',
            maxWidth: '1000px',
            margin: '0 auto',
            boxSizing: 'border-box',
            background: 'var(--bg-primary)',
            borderRadius: '24px',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-lg)'
          }}
          id="estimator-container"
        >
          {/* LEFT COLUMN: FORM */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
            {/* Active customizer notice */}
            {hasCustomDesign && (
              <div
                style={{
                  background: 'rgba(46, 180, 231, 0.08)',
                  border: '1px solid rgba(46, 180, 231, 0.2)',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '0.85rem',
                  color: 'var(--text-primary)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Sparkles size={16} color="var(--light-blue)" />
                  <span>✨ ¡Diseño del simulador cargado con éxito!</span>
                </div>
                <button
                  onClick={() => {
                    setHasCustomDesign(false);
                    setCustomDesignDetails(null);
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--primary-pink)',
                    fontWeight: 700,
                    cursor: 'pointer',
                    fontSize: '0.8rem'
                  }}
                >
                  Limpiar
                </button>
              </div>
            )}

            {/* 1. Name */}
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px', display: 'block', color: 'var(--text-primary)' }}>
                👤 Tu Nombre
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Ej. María Pérez"
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '10px',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-sans)',
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.2s'
                }}
                onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--primary-pink)'; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--border-color)'; }}
              />
            </div>

            {/* 2. Product selection */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px', display: 'block', color: 'var(--text-primary)' }}>
                  🛍️ Producto
                </label>
                <select
                  value={product}
                  onChange={(e) => {
                    setProduct(e.target.value);
                    setHasCustomDesign(false);
                  }}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '10px',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-sans)',
                    outline: 'none'
                  }}
                >
                  <option value="camiseta">👕 Camiseta</option>
                  <option value="mug">☕ Mug / Taza</option>
                  <option value="gorra">🧢 Gorra</option>
                  <option value="cojin">🛋️ Cojín</option>
                  <option value="termos">🧴 Termos / Botellas</option>
                  <option value="agendas">📒 Agendas y más</option>
                </select>
              </div>

              {/* 3. Quantity */}
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px', display: 'block', color: 'var(--text-primary)' }}>
                  🔢 Cantidad
                </label>
                <input
                  type="number"
                  min="1"
                  max="1000"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '10px',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-sans)',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>

            {/* 4. Options & Printing area */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px', display: 'block', color: 'var(--text-primary)' }}>
                  📏 Modelo / Talla
                </label>
                <select
                  value={sizeOption}
                  onChange={(e) => setSizeOption(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '10px',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-sans)',
                    outline: 'none'
                  }}
                >
                  {productDetails[product]?.options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px', display: 'block', color: 'var(--text-primary)' }}>
                  🎯 Área de Estampado
                </label>
                <select
                  value={technique}
                  onChange={(e) => setTechnique(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '10px',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-sans)',
                    outline: 'none'
                  }}
                >
                  {productDetails[product]?.techniques.map((tech) => (
                    <option key={tech} value={tech}>
                      {tech}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* 5. Custom Notes */}
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px', display: 'block', color: 'var(--text-primary)' }}>
                💬 Detalles Adicionales
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Ej. Necesito 5 camisetas de niño y 10 de adulto. Quiero agregar nombres diferentes a cada mug..."
                rows="3"
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '10px',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.95rem',
                  outline: 'none',
                  resize: 'vertical',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </div>

          {/* RIGHT COLUMN: PRICE CARD */}
          <div
            style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: '20px',
              padding: '30px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: 'var(--shadow-sm)',
              textAlign: 'left'
            }}
          >
            <div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShoppingCart size={20} color="var(--primary-pink)" /> Resumen del Presupuesto
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.95rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Precio Unitario Estimado:</span>
                  <span style={{ fontWeight: 600 }}>${pricing.unitPrice.toLocaleString('es-CO')} COP</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Cantidad:</span>
                  <span style={{ fontWeight: 600 }}>{quantity} un.</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Subtotal:</span>
                  <span style={{ fontWeight: 600 }}>${pricing.subtotal.toLocaleString('es-CO')} COP</span>
                </div>

                {pricing.discountPercent > 0 ? (
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      color: '#10b981',
                      fontWeight: 700,
                      background: 'rgba(16, 185, 129, 0.1)',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      alignItems: 'center'
                    }}
                  >
                    <span>🎯 Descuento ({pricing.discountPercent}%):</span>
                    <span>-${pricing.discountAmount.toLocaleString('es-CO')} COP</span>
                  </div>
                ) : (
                  <div
                    style={{
                      fontSize: '0.8rem',
                      color: 'var(--text-secondary)',
                      background: 'var(--bg-tertiary)',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      marginTop: '4px'
                    }}
                  >
                    <Gift size={14} color="var(--accent-yellow)" />
                    <span>¡Pide 12+ unidades para obtener 10% de descuento!</span>
                  </div>
                )}
              </div>
            </div>

            <div style={{ marginTop: '30px' }}>
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '24px' }}>
                <span style={{ fontSize: '1.1rem', fontWeight: 700 }}>Total Estimado:</span>
                <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary-pink)' }}>
                  ${pricing.total.toLocaleString('es-CO')} COP
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button
                  onClick={sendWhatsAppOrder}
                  className="btn btn-accent"
                  style={{
                    width: '100%',
                    padding: '16px',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #25d366 0%, #128c7e 100%)',
                    color: 'white',
                    boxShadow: '0 8px 20px rgba(37, 211, 102, 0.25)',
                    fontWeight: 700,
                    border: 'none',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    fontSize: '1rem'
                  }}
                  onMouseEnter={(e) => { 
                    e.currentTarget.style.transform = 'scale(1.02)'; 
                    e.currentTarget.style.boxShadow = '0 12px 30px rgba(37, 211, 102, 0.35)';
                  }}
                  onMouseLeave={(e) => { 
                    e.currentTarget.style.transform = 'scale(1)'; 
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(37, 211, 102, 0.25)';
                  }}
                >
                  <Send size={18} />
                  Enviar por WhatsApp
                </button>

                <button
                  onClick={copyMessageToClipboard}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '12px',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-primary)',
                    color: 'var(--text-secondary)',
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
                    e.currentTarget.style.borderColor = 'var(--primary-pink)'; 
                    e.currentTarget.style.color = 'var(--text-primary)';
                  }}
                  onMouseLeave={(e) => { 
                    e.currentTarget.style.borderColor = 'var(--border-color)'; 
                    e.currentTarget.style.color = 'var(--text-secondary)';
                  }}
                >
                  📋 Copiar mensaje
                </button>
              </div>

              <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '12px' }}>
                Te responderemos en WhatsApp para coordinar el pago, el envío y confirmar el diseño definitivo.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 769px) {
          #estimator-container {
            grid-template-columns: 1.2fr 1fr !important;
          }
        }
        @media (max-width: 640px) {
          #estimator-container {
            padding: 20px !important;
          }
        }
      `}</style>
    </section>
  );
}