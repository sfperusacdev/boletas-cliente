import automatiza from "../images/icon/automatizado.png";
import registra from "../images/icon/auditoria.png";
import firma from "../images/icon/firma-digital.png";
import asistencia from "../images/icon/disponibilidad.png";
import mensajeria from "../images/icon/globos-de-texto.png";
import tareo from "../images/icon/escaneo-qr.png";

export const CardsSolution = () => {
  return (
    <section id="soluciones" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="aspect-video w-full">
          <iframe
            id="youtube-video"
            className="w-full h-full"
            src="https://www.youtube.com/embed/VCtS0PZfB_k"
            title="YouTube video"
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>
        </div>

        <h2 className="text-4xl font-bold text-gray-900 mb-4 mt-10">NUESTRA SOLUCIÓN</h2>
        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto mb-12">
          Más allá de ofrecer solo una plataforma de envío o visualización, nuestra solución actúa como un sistema
          integral de gestión documental laboral
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200 flex flex-col items-center text-center transform hover:animate-scale transition-transform duration-500 ease-in-out">
            <div className="text-6xl text-blue-500 mb-4">
              <img src={automatiza} alt="Automatizacion." width={70} height={70} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Automatiza</h3>
            <p className="text-gray-600">Distribución de documentos a trabajadores.</p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200 flex flex-col items-center text-center transform hover:animate-scale transition-transform duration-500 ease-in-out">
            <div className="text-6xl text-blue-500 mb-4">
              <img src={registra} alt="Automatizacion." width={70} height={70} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Registra y audita</h3>
            <p className="text-gray-600">Cada aceptación o firma.</p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200 flex flex-col items-center text-center transform hover:animate-scale transition-transform duration-500 ease-in-out">
            <div className="text-6xl text-blue-500 mb-4">
              <img src={firma} alt="Automatizacion." width={70} height={70} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Aplica firma digital avanzada (FDA)</h3>
            <p className="text-gray-600">Desde la empresa con validez oficial.</p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200 flex flex-col items-center text-center transform hover:animate-scale transition-transform duration-500 ease-in-out">
            <div className="text-6xl text-blue-500 mb-4">
              <img src={asistencia} alt="Automatizacion." width={70} height={70} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Control de Asistencia y Turnos</h3>
            <p className="text-gray-600">Con integración para reportes SUNAFIL.</p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200 flex flex-col items-center text-center transform hover:animate-scale transition-transform duration-500 ease-in-out">
            <div className="text-6xl text-blue-500 mb-4">
              <img src={mensajeria} alt="Automatizacion." width={70} height={70} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Mensajería Masiva Multicanal</h3>
            <p className="text-gray-600">Comunicación efectiva vía SMS, WhatsApp y correo electrónico.</p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200 flex flex-col items-center text-center transform hover:animate-scale transition-transform duration-500 ease-in-out">
            <div className="text-6xl text-blue-500 mb-4">
              <img src={tareo} alt="Automatizacion." width={70} height={70} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Tareo en Cosecha Agrícola</h3>
            <p className="text-gray-600">Con gestión por QR y reportes de productividad.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
