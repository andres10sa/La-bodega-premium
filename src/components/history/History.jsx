import React from 'react';
import drink from "./../../assets/images/trago-colombiano.png";

// Componente para un hito individual en la línea de tiempo
const TimelineItem = ({ year, title, description, iconClass, isLast }) => (
  <div className="flex relative">
    {/* Línea de tiempo vertical y punto distintivo */}
    <div className="flex flex-col items-center mr-6">
      <div className="h-full w-1 bg-golden"></div> 
      <div className="z-10 bg-golden rounded-full p-2 shadow-lg ring-4 ring-white ring-opacity-60">
        <i className={`${iconClass} text-white w-5 h-5 flex items-center justify-center`}></i>
      </div>
      {/* Ocultamos la línea de conexión para el último elemento */}
      {!isLast && <div className="h-full w-1 bg-golden"></div>}
    </div>

    {/* Contenido del hito */}
    <div className={`py-4 ${isLast ? '' : 'pb-10'} -mt-1`}>
      <span className="text-sm font-semibold uppercase text-golden tracking-wider mb-1 block">{year}</span>
      <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 leading-relaxed max-w-lg">{description}</p>
    </div>
  </div>
);


export const History = () => {
  return (
    <div
      id="history"
      className="w-full bg-white p-8 sm:p-12 md:p-16 flex items-center justify-center"
    >
      <div className="w-full max-w-6xl">
        {" "}
        {/* Aumentado el max-w para acomodar la imagen */}
        {/* Encabezado Principal */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            Nuestra Historia
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Desde 1985, dedicados a la excelencia. Descubre el camino que nos
            convirtió en tu licorería de confianza.
          </p>
        </div>
        {/* Contenido principal: Línea de tiempo y Imagen */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
          {/* Columna de la Línea de Tiempo */}
          <div className="md:pr-8">
            {" "}
            {/* Añadido padding a la derecha para separar de la imagen */}
            <div className="pl-4 sm:pl-8">
              <TimelineItem
                year="1985"
                title="La Fundación de un Sueño"
                description="Comenzamos como un pequeño establecimiento familiar, impulsados por la pasión por los tragos y la promesa de curar una colección inigualable."
                iconClass="fas fa-scroll"
                isLast={false}
              />

              <TimelineItem
                year="1998"
                title="Expansión de la Bodega"
                description="La demanda por la calidad nos obligó a expandirnos. Inauguramos nuestra primera bodega de añejamiento, permitiéndonos ofrecer etiquetas exclusivas de importación directa y tragos raros."
                iconClass="fas fa-warehouse"
                isLast={false}
              />

              <TimelineItem
                year="2010"
                title="Digitalización y Comunidad"
                description="Lanzamos nuestra plataforma en línea, llevando nuestra selección a todo el país y creando el Club de Aficionados, fortaleciendo nuestra comunidad de conocedores de tragos."
                iconClass="fas fa-globe-americas"
                isLast={false}
              />

              <TimelineItem
                year="Hoy"
                title="El Legado Continúa"
                description="Hoy nos mantenemos firmes en la tradición, pero siempre innovando. Nuestro compromiso es brindarte la mejor experiencia en la selección de tu trago perfecto."
                iconClass="fas fa-map-pin"
                isLast={true}
              />
            </div>
          </div>

          {/* Columna de la Imagen Premium */}
          <div className="flex justify-center items-center h-full md:mt-20">
            {" "}
            {/* Ajuste de margen superior para alinear con la historia */}
            {/* Placeholder de imagen premium */}
            <div className="relative w-full h-70 md:h-96 bg-gray-900 rounded-lg md:rounded-3xl shadow-xl overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-800/20 to-gray-900/80 flex items-center justify-center text-white text-2xl font-bold text-center">
                <i className="fas fa-glass-whiskey text-6xl text-amber-500/50 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform duration-300"></i>
                <img
                  src={drink}
                  alt="Botella de licor premium"
                  className="w-full h-full "
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Estilos y Carga de Font Awesome CSS */}
      <style>{`
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

