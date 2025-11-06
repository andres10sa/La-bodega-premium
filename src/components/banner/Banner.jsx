import React from "react";
import "./Banner.scss"

export const Banner = () => {
  return (
    <>
      <div className="textured-bg font-inter min-h-screen">
        <header className="w-full text-white pt-24 pb-20 md:py-32 flex items-center justify-center relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 text-center z-10 w-full">
            <div
              className="relative py-4 px-4 md:px-10 animate-entrance opacity-0"
              style={{ animationDelay: "0.2s" }}
            >
              <hr className="w-20 mx-auto mb-6 border-t border-[#D4B753]/50" />

              <h1 className="text-7xl sm:text-8xl md:text-9xl font-extrabold font-['Playfair_Display'] leading-tight mb-4 text-gradient-gold">
                LA BODEGA PREMIUM
              </h1>

              <p className="text-xl md:text-2xl font-light italic text-zinc-300 max-w-4xl mx-auto mb-10 tracking-wider">
                — El Arte de Elegir la Celebración Perfecta —
              </p>

              <hr className="w-20 mx-auto mt-6 border-t border-[#D4B753]/50" />
            </div>

            <div
              className="mt-12 mb-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto animate-entrance opacity-0"
              style={{ animationDelay: "0.5s" }}
            >
              <div className="p-4 border-t-2 border-[#D4B753]/60">
                {/* Icono Boxes (lucide) reemplazado por Cubes (Font Awesome) */}
                <i className="fas fa-cubes text-3xl color-dorado mb-3 mx-auto" />
                <h3 className="text-lg font-semibold mb-2 uppercase tracking-wider">
                  Infinita Variedad
                </h3>
                <p className="text-sm text-zinc-400">
                  Desde whisky escocés hasta los mejores vinos de reserva.
                  Encuentre todo lo que busca y más.
                </p>
              </div>

              <div className="p-4 border-t-2 border-[#D4B753]/60">
                {/* Icono Star (lucide) reemplazado por Star (Font Awesome) */}
                <i className="fas fa-star text-3xl color-dorado mb-3 mx-auto" />
                <h3 className="text-lg font-semibold mb-2 uppercase tracking-wider">
                  Calidad Garantizada
                </h3>
                <p className="text-sm text-zinc-400">
                  Solo trabajamos con destiladores y bodegas que cumplen los más
                  altos estándares de excelencia.
                </p>
              </div>

              <div className="p-4 border-t-2 border-[#D4B753]/60">
                {/* Icono Handshake (lucide) reemplazado por Handshake (Font Awesome) */}
                <i className="fas fa-handshake text-3xl color-dorado mb-3 mx-auto" />
                <h3 className="text-lg font-semibold mb-2 uppercase tracking-wider">
                  Asesoría Premium
                </h3>
                <p className="text-sm text-zinc-400">
                  Nuestro equipo está listo para guiarlo a través de nuestra
                  selección y hacer la mejor recomendación.
                </p>
              </div>
            </div>

            <a
              href="#products"
              className="inline-flex items-center justify-center px-16 py-4 text-xl font-bold uppercase tracking-widest rounded-full bg-dorado text-zinc-950 transition-all duration-300 shadow-2xl hover:bg-dorado/90 active:bg-dorado animate-entrance opacity-0"
              style={{ animationDelay: "0.8s" }}
            >
              Explorar Colección
              {/* Icono ChevronRight (lucide) reemplazado por ChevronRight (Font Awesome) */}
              <i className="fas fa-chevron-right ml-4 text-xl" />
            </a>
          </div>
        </header>
      </div>
    </>
  );
};
