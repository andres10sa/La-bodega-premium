import React from 'react'
import "./Paralax.scss"

export const Paralax = () => {
  return (
    <div class="parallax">
      <div class="parallax-overlay"></div>
      <div class="max-w-7xl mx-auto text-center relative z-10 p-4">
        <h2 class="text-5xl font-extrabold text-white mb-4">
          Galería Exclusiva
        </h2>
        <p class="text-xl text-gray-200">
          Una mirada a nuestra selección curada de destilados de colección.
        </p>
      </div>
    </div>
  );
};


