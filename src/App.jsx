import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CategoryGrid from './components/CategoryGrid';
import ProductCustomizer from './components/ProductCustomizer';
import QuoteEstimator from './components/QuoteEstimator';
import Portfolio from './components/Portfolio';
import Footer from './components/Footer';

export default function App() {
  const [customizerData, setCustomizerData] = useState(null);

  const handleQuotePrefill = (data) => {
    setCustomizerData(data);
  };

  return (
    <>
      <Navbar />
      <Hero />
      <CategoryGrid />
      <ProductCustomizer onQuoteSelect={handleQuotePrefill} />
      <QuoteEstimator prefill={customizerData} />
      <Portfolio />
      <Footer />
    </>
  );
}
