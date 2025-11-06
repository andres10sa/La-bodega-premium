import React from 'react'

export const Testimonials = () => {
  return (
    <div id="testimonials" class="section-padding bg-gray-50">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-4xl font-bold text-center text-gray-900 mb-12">
          Lo que Dicen Nuestros <span class="text-accent">Clientes</span>
        </h2>

        <div class="grid md:grid-cols-3 gap-8">
          <div class="bg-white p-6 rounded-xl shadow-lg border-t-4 border-accent">
            <i class="fas fa-quote-left text-accent text-3xl mb-4"></i>
            <p class="text-gray-600 italic mb-4">
              "La mejor selección de whiskys que he encontrado en línea. El
              servicio de entrega es rápido y la botella llegó perfectamente
              empacada. ¡Totalmente recomendado!"
            </p>
            <div class="font-semibold text-gray-900">- Juan M., Bogotá</div>
          </div>

          <div class="bg-white p-6 rounded-xl shadow-lg border-t-4 border-accent">
            <i class="fas fa-quote-left text-accent text-3xl mb-4"></i>
            <p class="text-gray-600 italic mb-4">
              "Compré un Ron de Reserva para un regalo y quedé impresionado con
              la calidad y la presentación. El sitio web es muy fácil de usar."
            </p>
            <div class="font-semibold text-gray-900">- Sofía P., Medellín</div>
          </div>

          <div class="bg-white p-6 rounded-xl shadow-lg border-t-4 border-accent">
            <i class="fas fa-quote-left text-accent text-3xl mb-4"></i>
            <p class="text-gray-600 italic mb-4">
              "Su sección de Tequilas Añejos es insuperable. Encontré justo lo
              que estaba buscando para mi colección personal. Volveré por más."
            </p>
            <div class="font-semibold text-gray-900">- Carlos A., Cali</div>
          </div>
        </div>
      </div>
    </div>
  );
}


