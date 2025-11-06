import React, { useState, useEffect } from "react";

export const Subscription = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");

  useEffect(() => {
    let timer;
    if (isSubscribed) {
      timer = setTimeout(() => {
        setIsSubscribed(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [isSubscribed]);

  const handleSubscribe = (e) => {
    e.preventDefault();
    setMessage("");

    if (!email || !email.includes("@") || !email.includes(".")) {
      setMessage("Por favor, ingrese un correo electrónico válido.");
      return;
    }

    setTimeout(() => {
      setIsSubscribed(true);
      setSubmittedEmail(email);
      // Asignamos una cadena vacía a 'message' para que no se muestre ningún texto adicional
      setMessage("");
      setEmail("");
    }, 500);
  };

  return (
    <div className="w-full bg-primary p-4 sm:p-8">
      <div className="w-full max-w-md mx-auto bg-stone-800 rounded-2xl shadow-2xl p-6 sm:p-8 border-4 border-[#D4B753] relative overflow-hidden">
        {isSubscribed && <SuccessModal email={submittedEmail} />}

        <div className="text-center transition-opacity duration-300">
          <BottleIcon />
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
            El Club Exclusivo
          </h1>
          <p className="text-sm sm:text-base text-golden uppercase font-semibold tracking-widest mb-6">
            La Bodega Premium
          </p>

          <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-6">
            Únase a nuestra membresía secreta para obtener acceso anticipado a
            botellas raras, ediciones limitadas y descuentos solo para miembros.
          </p>
        </div>

        <form onSubmit={handleSubscribe} className="space-y-4">
          <input
            type="email"
            placeholder="Introduce tu correo electrónico (ej: tu@correo.com)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-stone-700 bg-stone-900 text-white rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all placeholder-gray-500"
            required
            aria-label="Correo electrónico para suscripción"
            disabled={isSubscribed}
          />

          <button
            type="submit"
            className="w-full py-3 bg-golden text-black font-bold text-base rounded-xl shadow-lg shadow-amber-900/50 hover:bg-amber-500 transition-transform transform hover:scale-[1.01] active:scale-95 duration-200"
            disabled={isSubscribed}
          >
            {isSubscribed ? "¡Suscrito!" : "Suscribirse Ahora"}
          </button>
        </form>

        {message && !isSubscribed && (
          <div className="mt-4 p-3 rounded-lg text-center font-medium bg-red-700 text-white text-sm">
            {message}
          </div>
        )}

        <p className="text-xs text-gray-500 text-center mt-4">
          Prometemos no enviar spam. Su privacidad es tan importante como
          nuestro mejor whisky.
        </p>
      </div>
    </div>
  );
};

const BottleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-10 h-10 text-golden fill-current mb-3"
    viewBox="0 0 24 24"
  >
    <path d="M14 6V3H10V6H5L4 22H20L19 6H14ZM12 18C10.9 18 10 17.1 10 16S10.9 14 12 14 14 14.9 14 16 13.1 18 12 18ZM17 9H7V7H17V9Z" />
  </svg>
);

const SuccessModal = ({ email }) => {
  return (
    <div
      className="absolute inset-0 bg-stone-900/95 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center p-6 transition-opacity duration-500"
      style={{ animation: "fade-in-up 0.5s ease-out forwards" }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-14 h-14 text-green-400 mb-3 animate-bounce-once"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>

      <h2 className="text-2xl font-bold text-white mb-2">
        ¡Suscripción Exitosa!
      </h2>
      {/* Eliminado el párrafo que mostraba el mensaje de confirmación */}
      <div className="bg-amber-600/20 text-amber-300 font-mono text-xs px-3 py-1 rounded-full mt-3">
        {email}
      </div>

      <style>{`
          @keyframes fade-in-up {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes bounce-once {
              0%, 20%, 50%, 80%, 100% {
                  transform: translateY(0);
              }
              40% {
                  transform: translateY(-10px);
              }
              60% {
                  transform: translateY(-5px);
              }
          }
        `}</style>
    </div>
  );
};
