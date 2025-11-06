import React, { useState, useEffect } from "react";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState(""); // 'success', 'error', 'submitting'

  // Efecto para eliminar el mensaje de éxito después de 5 segundos
  useEffect(() => {
    if (status === "success") {
      const timer = setTimeout(() => {
        setStatus("");
      }, 5000); // 5000 milisegundos = 5 segundos

      // Función de limpieza para cancelar el temporizador si el componente se desmonta o el estado cambia antes.
      return () => clearTimeout(timer);
    }
  }, [status]); // Dependencia: Se ejecuta cada vez que 'status' cambia.

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");

    const { name, email, message } = formData;
    if (!name || !email || !message) {
      setStatus("error");
      return;
    }

    try {
      // Simulación de una llamada a API
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Formulario enviado:", formData);
      setStatus("success");
      // No reseteamos el formulario aquí para que el usuario vea el mensaje de éxito,
      // pero podríamos hacerlo si quisiéramos borrar los campos inmediatamente.
      // Por ahora, dejamos los campos llenos.
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      setStatus("error");
    }
  };

  return (
    <div
      id="contact"
      className="w-full bg-stone-100 p-8 md:p-12 flex items-center justify-center"
    >
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl p-6 sm:p-8 md:p-10 border border-gray-200">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
            Hablemos de La Bodega Premium
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            ¿Preguntas sobre existencias, pedidos o simplemente un saludo?
            Estamos aquí para ayudarte con tu trago favorito.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Campos de Nombre y Correo Electrónico */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <i className="fas fa-user w-5 h-5 text-gray-500"></i>
              </span>
              <input
                type="text"
                name="name"
                placeholder="Tu Nombre Completo"
                value={formData.name}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 bg-white text-gray-900 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-amber-600 transition-all placeholder-gray-500"
                required
              />
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <i className="fas fa-envelope w-5 h-5 text-gray-500"></i>
              </span>
              <input
                type="email"
                name="email"
                placeholder="Tu Correo Electrónico"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 bg-white text-gray-900 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-amber-600 transition-all placeholder-gray-500"
                required
              />
            </div>
          </div>

          {/* Campo de Teléfono */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <i className="fas fa-phone w-5 h-5 text-gray-500"></i>
            </span>
            <input
              type="tel"
              name="phone"
              placeholder="Número de Teléfono (opcional)"
              value={formData.phone}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 bg-white text-gray-900 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-amber-600 transition-all placeholder-gray-500"
            />
          </div>

          {/* Campo de Mensaje */}
          <div className="relative">
            <span className="absolute top-3 left-0 pl-3 flex items-start">
              <i className="fas fa-comment-alt w-5 h-5 text-gray-500"></i>
            </span>
            <textarea
              name="message"
              rows="5"
              placeholder="Escribe tu mensaje aquí..."
              value={formData.message}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 bg-white text-gray-900 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-amber-600 transition-all placeholder-gray-500 resize-y"
              required
            ></textarea>
          </div>

          {/* Botón de Enviar */}
          <button
            type="submit"
            className="w-full py-3 bg-gray-900 cursor-pointer text-white font-bold text-lg rounded-lg shadow-md shadow-gray-900/60 hover:bg-gray-800 transition-transform transform hover:scale-[1.01] active:scale-95 duration-200 flex items-center justify-center"
            disabled={status === "submitting"}
          >
            {status === "submitting" ? (
              <>
                <i className="fas fa-spinner fa-spin h-5 w-5 text-white mr-3"></i>
                Enviando...
              </>
            ) : (
              "Enviar Mensaje"
            )}
          </button>
        </form>

        {/* Mensajes de Estado */}
        {status === "success" && (
          <div className="mt-6 flex items-center justify-center p-4 bg-green-100 text-green-800 rounded-lg font-medium animate-fade-in">
            <i className="fas fa-check-circle w-6 h-6 mr-2"></i>
            ¡Gracias por tu mensaje! Nos pondremos en contacto pronto.
          </div>
        )}
        {status === "error" && (
          <div className="mt-6 flex items-center justify-center p-4 bg-red-100 text-red-800 rounded-lg font-medium animate-fade-in">
            <i className="fas fa-exclamation-triangle w-6 h-6 mr-2"></i>
            Hubo un error al enviar tu mensaje. Por favor, intenta de nuevo.
          </div>
        )}
      </div>
      {/* Estilos y Carga de Font Awesome CSS */}
      <style>{`
          @keyframes fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .animate-fade-in {
            animation: fade-in 0.5s ease-out forwards;
          }
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;800&display=swap');
          body {
            font-family: 'Inter', sans-serif;
          }
          /* Importación de Font Awesome 6.5.2 CSS */
          @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css');
        `}</style>
    </div>
  );
};
