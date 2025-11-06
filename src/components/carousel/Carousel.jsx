import React, { useState, useCallback, useEffect } from "react";
import { PRODUCTS } from "./";

const formatPriceCOP = (price) => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(price);
};

const ConfirmationToast = ({ isVisible, product, onClose }) => {
  const visibilityClass = isVisible
    ? "translate-x-0 opacity-100"
    : "translate-x-full opacity-0 pointer-events-none";

  return (
    <div
      className={`fixed top-8 right-8 z-100 bg-[#3b2a0e] text-white p-4 pr-6 rounded-lg shadow-xl border border-[#D4B753] transition-transform duration-500 ease-in-out ${visibilityClass}`}
      role="alert"
    >
      <div className="flex items-center">
        <i className="fas fa-check-circle text-[#D4B753] mr-3 text-xl"></i>
        <p className="text-sm font-light">
          <strong>{product ? product.name : "Producto"}</strong> ha sido
          agregado.
        </p>
        <button
          onClick={onClose}
          className="ml-4 text-zinc-400 hover:text-[#D4B753] transition-colors"
        >
          <i className="fas fa-times"></i>
        </button>
      </div>
    </div>
  );
};

export const Carousel = ({ addToCart }) => {
  const ORIGINAL_LENGTH = PRODUCTS.length; // 20
  const CLONE_COUNT = 3;
  const LAST_CLONES = PRODUCTS.slice(-CLONE_COUNT);
  const FIRST_CLONES = PRODUCTS.slice(0, CLONE_COUNT);
  const CLONED_PRODUCTS = [...LAST_CLONES, ...PRODUCTS, ...FIRST_CLONES];
  const TOTAL_LENGTH = CLONED_PRODUCTS.length; // 26 (3 + 20 + 3)
  // ARRAY_START_INDEX es el índice del primer elemento REAL (Producto 1) en CLONED_PRODUCTS (índice 3)
  const ARRAY_START_INDEX = CLONE_COUNT;
  const [isMobile, setIsMobile] = useState(false);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [jumpActive, setJumpActive] = useState(false); // Nuevo estado para bloquear input durante el salto

  // Calcula el índice donde el Producto 1 queda centrado (Desktop: index 2, Mobile: index 3)
  const getInitialIndex = useCallback((isMobileView) => {
    // centerOffset: 1 para escritorio, 0 para móvil (donde el primer item es el central)
    const centerOffset = isMobileView ? 0 : 1;
    return ARRAY_START_INDEX - centerOffset;
  }, []);

  const [currentIndex, setCurrentIndex] = useState(
    getInitialIndex(window.innerWidth < 768)
  );

  const [modalData, setModalData] = useState({
    isVisible: false,
    product: null,
  });
  const [isTransitioning, setIsTransitioning] = useState(true);
  const transitionDuration = 700;

  // 1. Efecto para inicializar y manejar resize
  useEffect(() => {
    const updateLayout = () => {
      const mobile = window.innerWidth < 768;

      if (isMobile !== mobile) {
        setIsMobile(mobile);
        setItemsPerView(mobile ? 1 : 3);
        // Reiniciar al índice que centra el Producto 1
        setCurrentIndex(getInitialIndex(mobile));
      }
    };

    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, [getInitialIndex, isMobile]);

  // 2. Lógica de Teletransportación (bucle infinito)
  useEffect(() => {
    let timeout;

    const centerOffset = itemsPerView > 1 ? 1 : 0;

    // Posición que centra el Producto 1 real (Desktop: 2, Mobile: 3)
    const firstRealCenteredPosition = ARRAY_START_INDEX - centerOffset;

    // Posición que centra el Producto 20 real (Desktop: 21, Mobile: 22)
    // El índice de la tarjeta P20 es 22. La posición de inicio de la lista es 22 - centerOffset.
    const lastRealCenteredPosition =
      ARRAY_START_INDEX + ORIGINAL_LENGTH - 1 - centerOffset;

    // --- SALTO DERECHA: Del clon P1 al P1 real ---
    // Se activa cuando currentIndex es la posición que centra el CLON P1 (última posición antes del límite)
    const jumpFromRightPosition = lastRealCenteredPosition + 1; // Desktop: 21 + 1 = 22. Mobile: 22 + 1 = 23.

    if (currentIndex >= jumpFromRightPosition) {
      setJumpActive(true); // Bloquear input
      timeout = setTimeout(() => {
        setIsTransitioning(false);
        // Salta de vuelta al inicio real (Producto 1 centrado)
        setCurrentIndex(firstRealCenteredPosition);
        setJumpActive(false); // Desbloquear input después del salto
      }, transitionDuration);
    }

    // --- SALTO IZQUIERDA: Del clon P20 al P20 real ---
    // Se activa cuando currentIndex es la posición que centra el CLON P20 (primera posición antes del límite)
    const jumpFromLeftPosition = firstRealCenteredPosition - 1; // Desktop: 2 - 1 = 1. Mobile: 3 - 1 = 2.

    if (currentIndex < jumpFromLeftPosition) {
      setJumpActive(true); // Bloquear input
      timeout = setTimeout(() => {
        setIsTransitioning(false);
        // Salta al final real (Producto 20 centrado)
        setCurrentIndex(lastRealCenteredPosition);
        setJumpActive(false); // Desbloquear input después del salto
      }, transitionDuration);
    }

    // Reactivar la transición después del salto, si no está activo el salto
    if (!isTransitioning && !jumpActive) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(true);
        });
      });
    }

    return () => {
      clearTimeout(timeout);
      // Asegurarse de que el estado jumpActive se limpia si el componente se desmonta.
      // No es necesario resetearlo aquí si se maneja correctamente en el timeout.
    };
  }, [currentIndex, isTransitioning, isMobile, itemsPerView]);

  // 3. Handlers de navegación
  const next = useCallback(() => {
    if (jumpActive) return; // Bloquear si estamos en medio de un salto

    // El límite máximo es la última posición que centra el último clon del inicio (Producto 3)
    if (currentIndex < TOTAL_LENGTH - (itemsPerView > 1 ? 1 : 0)) {
      setCurrentIndex(currentIndex + 1);
    }
  }, [currentIndex, itemsPerView, jumpActive]);

  const prev = useCallback(() => {
    if (jumpActive) return; // Bloquear si estamos en medio de un salto

    // El límite mínimo es la primera posición que centra el primer clon del final (Producto 20)
    if (currentIndex > (itemsPerView > 1 ? 0 : 0)) {
      setCurrentIndex(currentIndex - 1);
    }
  }, [currentIndex, itemsPerView, jumpActive]);

  const handleDotClick = useCallback(
    (dotIndex) => {
      if (jumpActive) return; // Bloquear si estamos en medio de un salto

      // centerOffset: 1 para escritorio, 0 para móvil
      const centerOffset = itemsPerView > 1 ? 1 : 0;

      // Calcula la posición correcta para centrar el producto real de índice 'dotIndex'
      // La posición real del producto 0 es ARRAY_START_INDEX (3).
      // Para centrar P1 (index 0) en desktop, necesitamos 3 - 1 = 2.
      // Por lo tanto, el targetIndex es ARRAY_START_INDEX - centerOffset + dotIndex
      const targetIndex = ARRAY_START_INDEX - centerOffset + dotIndex;
      setCurrentIndex(targetIndex);
    },
    [itemsPerView, jumpActive]
  );

  const transformX = isMobile
    ? `translateX(-${currentIndex * 100}%)`
    : `translateX(-${currentIndex * (100 / itemsPerView)}%)`;

  const renderProductCard = (product, index) => {
    // Calcular el índice de la tarjeta central visible
    const centerOffset = Math.floor(itemsPerView / 2);
    const isCenter = index === currentIndex + centerOffset;

    // La tarjeta central siempre se destaca para permitir la interacción
    const isHighlight = isCenter;

    const cardClasses = isMobile
      ? "w-full px-4"
      : "w-[calc(33.33%-1.5rem)] mr-6";
    const effectClasses = isHighlight
      ? "shadow-[0_0_40px_rgba(212,183,83,0.4)] border-[#D4B753]"
      : isMobile
      ? "opacity-80 scale-[0.98]"
      : "opacity-70 scale-[0.9] blur-[1px] hover:shadow-[0_0_20px_rgba(212,183,83,0.1)]";

    return (
      <div
        id="products"
        className={`flex-shrink-0 h-full ${cardClasses}`}
        style={
          isMobile
            ? {
                minWidth: "100%",
                paddingLeft: "1.5rem",
                paddingRight: "1.5rem",
              }
            : {}
        }
      >
        <div
          className={`h-full w-full bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden shadow-2xl transition-all duration-700 ${effectClasses}`}
        >
          <div
            className={`relative h-[300px] sm:h-[400px] flex items-center justify-center p-8 transition-transform duration-700`}
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className="max-h-full w-auto object-contain transition-all duration-700"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://placehold.co/400x550/111827/D4B753?text=BOTELLA";
              }}
            />
            {isHighlight && (
              <div
                className="absolute inset-0 z-0 opacity-10 transition-opacity duration-700"
                style={{
                  background:
                    "radial-gradient(circle at center, #D4B753 0%, transparent 70%)",
                }}
              ></div>
            )}
          </div>
          <div className="p-6 text-center border-t border-zinc-800">
            <div className="text-sm text-[#D4B753] uppercase tracking-widest font-semibold mb-1">
              {product.details}
            </div>
            <h3 className="text-xl font-serif text-white mb-4">
              {product.name}
            </h3>
            <div className="mt-4 pt-3 border-t border-zinc-800">
              <p className="text-3xl font-extrabold text-[#D4B753] mb-4">
                {formatPriceCOP(product.price)}
              </p>
              <button
                onClick={() => addToCart(product)}
                disabled={!isHighlight}
                className={`w-full py-3 cursor-pointer rounded-sm font-semibold text-sm uppercase tracking-wider transition-all duration-300 flex items-center justify-center 
                  ${
                    isHighlight
                      ? "bg-[#D4B753] text-zinc-900 hover:bg-[#a58942] active:scale-[0.98] shadow-md shadow-[#D4B753]/30"
                      : "bg-zinc-800 text-zinc-500 cursor-default opacity-50"
                  }`}
              >
                <i className="fas fa-shopping-cart mr-3"></i>
                {isHighlight ? "Agregar al Carrito" : "Seleccionar"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 4. Lógica de Puntos Final (siempre se basa en la posición central actual)
  let offset = currentIndex - getInitialIndex(isMobile);
  let activeDotIndex =
    ((offset % ORIGINAL_LENGTH) + ORIGINAL_LENGTH) % ORIGINAL_LENGTH;

  return (
    <div className="bg-zinc-950 text-white pb-20 font-inter min-h-screen flex items-center">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <header className="text-center mb-10 md:mb-16 lg:mb-24">
          <h1 className="text-4xl sm:text-6xl lg:text-8xl font-serif text-[#D4B753] tracking-wider mb-2">
            Productos destacados
          </h1>
        </header>

        <div className="relative flex items-center justify-center">
          <button
            onClick={prev}
            disabled={jumpActive}
            className={`absolute cursor-pointer left-0 lg:-left-10 z-20 p-4 text-3xl text-[#D4B753] hover:text-white transition-colors duration-300 bg-zinc-950/50 rounded-full shadow-lg 
            ${jumpActive ? "opacity-50 cursor-not-allowed" : ""}`}
            aria-label="Anterior"
          >
            <i className="fas fa-chevron-left"></i>
          </button>

          <div className="w-full max-w-6xl overflow-hidden h-[600px] lg:h-[680px] lg:pl-6">
            <div
              className={`flex transition-transform`}
              style={{
                transform: transformX,
                transitionDuration: isTransitioning
                  ? `${transitionDuration}ms`
                  : "0ms",
              }}
            >
              {CLONED_PRODUCTS.map(renderProductCard)}
            </div>
          </div>

          <button
            onClick={next}
            disabled={jumpActive}
            className={`absolute cursor-pointer right-0 lg:-right-10 z-20 p-4 text-3xl text-[#D4B753] hover:text-white transition-colors duration-300 bg-zinc-950/50 rounded-full shadow-lg
            ${jumpActive ? "opacity-50 cursor-not-allowed" : ""}`}
            aria-label="Siguiente"
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>

        <div className="flex justify-center mt-12 space-x-2">
          {Array.from({ length: ORIGINAL_LENGTH }).map((_, index) => (
            <div
              key={index}
              onClick={() => handleDotClick(index)}
              className={`h-2 w-2 rounded-full cursor-pointer transition-colors duration-300 
                ${
                  index === activeDotIndex
                    ? "bg-[#D4B753] w-6"
                    : "bg-zinc-700 hover:bg-zinc-500"
                }`}
            />
          ))}
        </div>
      </div>

      <ConfirmationToast
        isVisible={modalData.isVisible}
        product={modalData.product}
        onClose={() => setModalData((prev) => ({ ...prev, isVisible: false }))}
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;600;800&display=swap');
        @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css');

        .font-serif { font-family: 'Playfair Display', serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
      `}</style>
    </div>
  );
};
