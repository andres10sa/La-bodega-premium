import React, { useCallback, useMemo } from "react";

const formatPriceCOP = (p) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(p);

// Actualizado para incluir botones de cantidad
const CartItem = ({ item, onRemove, onDecrease, onAdd }) => (
  <div className="flex items-start py-4 border-b border-zinc-700 last:border-b-0 transition-opacity duration-300 hover:opacity-100 opacity-90">
    <img
      src={item.imageUrl}
      alt={item.name}
      className="w-16 h-20 object-contain flex-shrink-0 mr-4 rounded"
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = "https://placehold.co/100x130/111827/D4B753?text=ITEM";
      }}
    />
    <div className="flex-grow">
      <h3
        className="text-white text-base font-semibold mb-1 truncate max-w-55"
        title={item.name}
      >
        {item.name}
      </h3>

      {/* Control de Cantidad */}
      <div className="flex items-center space-x-2 my-1">
        <button
          onClick={() => onDecrease(item.id)}
          className="text-zinc-400 hover:text-[#D4B753] transition-colors p-1 cursor-pointer"
          aria-label={`Disminuir cantidad de ${item.name}`}
        >
          <i className="fas fa-minus-circle text-sm"></i>
        </button>
        <span className="text-white font-medium text-sm">{item.quantity}</span>
        <button
          onClick={() => onAdd(item)}
          className="text-zinc-400 hover:text-[#D4B753] transition-colors p-1 cursor-pointer"
          aria-label={`Aumentar cantidad de ${item.name}`}
        >
          <i className="fas fa-plus-circle text-sm"></i>
        </button>
      </div>

      <p className="text-[#D4B753] text-lg font-bold mt-1">
        {formatPriceCOP(item.price * item.quantity)}
      </p>
    </div>

    <button
      onClick={() => onRemove(item.id)}
      className="text-zinc-500 hover:text-red-500 transition-colors duration-200 p-2 ml-2 flex-shrink-0 cursor-pointer"
      aria-label={`Remover ${item.name}`}
    >
      <i className="fas fa-trash-alt text-sm"></i>
    </button>
  </div>
);

export const Cart = ({ isVisible, onClose, items, setItems }) => {
  const subT = useMemo(
    () => items.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [items]
  );

  const shipC = items.length > 0 ? 15000 : 0;
  const taxV = subT * 0.19;
  const totalA = subT + shipC + taxV;

  // Función para ELIMINAR COMPLETAMENTE el producto
  const removeItem = useCallback(
    (id) => {
      setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    },
    [setItems]
  );

  // Función para AUMENTAR la cantidad (basada en la lógica inicial)
  const addItem = useCallback(
    (product) => {
      setItems((prevItems) => {
        const existingItem = prevItems.find((item) => item.id === product.id);
        if (existingItem) {
          return prevItems.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          return [...prevItems, { ...product, quantity: 1 }];
        }
      });
    },
    [setItems]
  );

  // FUNCIÓN PARA DISMINUIR LA CANTIDAD
  const decreaseQuantity = useCallback(
    (id) => {
      setItems((prevItems) => {
        const existingItem = prevItems.find((item) => item.id === id);

        // Si la cantidad es 1, lo eliminamos. Si no, restamos 1.
        if (existingItem && existingItem.quantity === 1) {
          return prevItems.filter((item) => item.id !== id);
        } else if (existingItem) {
          return prevItems.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item
          );
        }
        return prevItems; // Retorna sin cambios si no lo encuentra (caso improbable)
      });
    },
    [setItems]
  );

  // Si no está visible, lo movemos fuera de la pantalla.
  const panelClass = isVisible ? "translate-x-0" : "translate-x-full";

  // Si no está visible, lo ocultamos y deshabilitamos las interacciones.
  const visibilityClass = isVisible
    ? "pointer-events-auto"
    : "pointer-events-none";

  return (
    <div
      // Posiciona el carrito como un sidebar flotante en el borde derecho
      className={`fixed top-0 right-0 h-full w-full max-w-sm bg-zinc-900 shadow-2xl z-100 transform transition-transform duration-500 ease-in-out ${panelClass} ${visibilityClass}`}
    >
      <div className="flex flex-col h-full">
        <div className="p-6 flex justify-between items-center border-b border-[#D4B753]/30">
          <h2 className="text-3xl font-serif text-[#D4B753]">Mi Carrito</h2>
          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-white transition-colors text-2xl p-2 rounded-full hover:bg-zinc-800"
            aria-label="Cerrar carrito"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="flex-grow overflow-y-auto px-6 py-4 space-y-2 custom-scrollbar">
          {items.length > 0 ? (
            items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onRemove={removeItem}
                onDecrease={decreaseQuantity} // Nueva función
                onAdd={addItem} // Añadida para completar la interacción
              />
            ))
          ) : (
            <div className="text-center py-10">
              <i className="fas fa-shopping-basket text-6xl text-zinc-600 mb-4"></i>
              <p className="text-zinc-400">Su carrito está vacío.</p>
              <p className="text-zinc-500 text-sm mt-1">
                ¡Agregue algunos licores de lujo!
              </p>
            </div>
          )}
        </div>
        <div className="p-6 border-t border-zinc-700 bg-zinc-800">
          <div className="space-y-2 text-zinc-300">
            <div className="flex justify-between text-sm">
              <span>Subtotal:</span>
              <span>{formatPriceCOP(subT)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Envío:</span>
              <span>{formatPriceCOP(shipC)}</span>
            </div>
            <div className="flex justify-between text-sm border-b border-zinc-700 pb-2">
              <span>IVA (19%):</span>
              <span>{formatPriceCOP(taxV)}</span>
            </div>
            <div className="flex justify-between text-xl font-bold pt-2 text-[#D4B753]">
              <span>Total:</span>
              <span>{formatPriceCOP(totalA)}</span>
            </div>
          </div>
          <button
            disabled={items.length === 0}
            className={`w-full mt-6 py-3 rounded-sm font-semibold text-sm uppercase tracking-wider transition-all duration-300 flex items-center justify-center 
                            ${
                              items.length > 0
                                ? "bg-[#D4B753] text-zinc-900 hover:bg-[#a58942] active:scale-[0.98] shadow-lg shadow-[#D4B753]/30"
                                : "bg-zinc-700 text-zinc-500 cursor-not-allowed opacity-60"
                            }`}
            onClick={() => console.log("Procesando pago...")}
          >
            <i className="fas fa-credit-card mr-3"></i>
            PAGAR AHORA
          </button>
        </div>
      </div>
    </div>
  );
};
