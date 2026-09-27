import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2, Sparkles } from 'lucide-react';
import { FloralDivider, LotusIcon } from './OrnamentalIcons';
import { invitationData } from '../data/invitation';

export const SectionGallery = () => {
  const gallery = invitationData.gallery;
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const categories = ['All', 'Celebration', 'Portraits', 'Moments', 'Together'];

  const filteredPhotos =
    selectedCategory === 'All'
      ? gallery
      : gallery.filter((item) => item.category === selectedCategory || (selectedCategory === 'Together' && item.title.includes('Together')));

  // Lightbox keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]);

  const openLightbox = (index) => {
    setLightboxIndex(index);
  };

  const nextImage = () => {
    setLightboxIndex((prev) => (prev + 1) % filteredPhotos.length);
  };

  const prevImage = () => {
    setLightboxIndex((prev) => (prev - 1 + filteredPhotos.length) % filteredPhotos.length);
  };

  return (
    <section id="gallery" className="relative py-24 px-4 sm:px-6 md:px-12 bg-paper-texture overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="font-serif italic text-xs sm:text-sm uppercase tracking-widest text-gold-700 font-semibold">
            Visual Memories
          </span>
          <h2 className="font-royal text-3xl sm:text-5xl font-bold text-burgundy-950">
            Moments in Eternal Bloom
          </h2>
          <FloralDivider className="my-3" />
          <p className="font-serif italic text-burgundy-900/80 text-base sm:text-lg">
            "A glimpse into the joy, smiles, and adventures of Revati & Prathamesh."
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full font-serif text-xs uppercase tracking-widest transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-burgundy-900 text-gold-200 border-2 border-gold-400 shadow-md scale-105'
                  : 'bg-white/80 text-burgundy-900/80 border border-gold-300 hover:border-gold-500'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredPhotos.map((photo, idx) => (
            <div
              key={photo.id}
              onClick={() => openLightbox(idx)}
              className="group relative cursor-pointer aspect-[3/4] rounded-2xl overflow-hidden p-1.5 bg-gradient-to-tr from-gold-300 via-gold-500 to-amber-700 shadow-royal-card hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5"
            >
              <div className="w-full h-full rounded-xl overflow-hidden bg-burgundy-950 relative">
                <img
                  src={photo.src}
                  alt={photo.title}
                  loading="lazy"
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                />

                {/* Hover Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-burgundy-950/90 via-burgundy-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <div className="flex items-center justify-between text-gold-300">
                    <span className="font-serif text-xs uppercase tracking-widest">{photo.category}</span>
                    <Maximize2 className="w-4 h-4" />
                  </div>
                  <h4 className="font-royal text-base text-ivory-50 font-bold mt-1">
                    {photo.title}
                  </h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && filteredPhotos[lightboxIndex] && (
        <div
          className="fixed inset-0 z-50 bg-burgundy-950/95 backdrop-blur-lg flex items-center justify-center p-4 sm:p-8"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Close Button */}
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 p-3 rounded-full bg-burgundy-900/80 border border-gold-400 text-gold-200 hover:scale-110 transition-transform z-10"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-4 sm:left-8 p-3 rounded-full bg-burgundy-900/80 border border-gold-400 text-gold-200 hover:scale-110 transition-transform z-10"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-4 sm:right-8 p-3 rounded-full bg-burgundy-900/80 border border-gold-400 text-gold-200 hover:scale-110 transition-transform z-10"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Lightbox Image Container */}
          <div
            className="relative max-w-4xl max-h-[85vh] rounded-2xl overflow-hidden p-2 bg-gradient-to-tr from-gold-500 to-amber-600 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative rounded-xl overflow-hidden bg-burgundy-950">
              <img
                src={filteredPhotos[lightboxIndex].src}
                alt={filteredPhotos[lightboxIndex].title}
                className="max-h-[75vh] w-auto mx-auto object-contain"
              />
              <div className="p-4 bg-burgundy-900/90 text-center border-t border-gold-500/30">
                <h4 className="font-royal text-lg text-gold-200 font-bold">
                  {filteredPhotos[lightboxIndex].title}
                </h4>
                <p className="font-serif text-xs text-ivory-200/70 mt-0.5">
                  Revati & Prathamesh • {filteredPhotos[lightboxIndex].category}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
