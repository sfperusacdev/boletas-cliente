import ahorro from "../images/ahorro_de_tiempo.png";
import seguridad from "../images/firma_digital_con_validez_legal.png";
import firma from "../images/seguridad_documental.png";

export const CardsBenefits = () => {
  return (
    <section id="beneficios" className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-6xl text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 mt-4">BENEFICIOS</h2>
        <p className="mt-4 text-lg text-gray-600 mx-auto mb-12">
          Implementar nuestra plataforma no solo mejora la gestión documental, sino que transforma procesos rutinarios
          en operaciones eficientes, seguras y legalmente sólidas. A continuación, detallamos los principales beneficios
          que tu organización puede obtener desde el primer mes de uso
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gray-100 p-6 rounded-lg shadow-sm flex flex-col items-center text-left relative transform hover:animate-pulsing transition-transform duration-500 ease-in-out">
            <div className="absolute top-4 right-4 bg-blue-500 text-white rounded-full h-8 w-8 flex items-center justify-center text-sm font-semibold">
              01
            </div>
            <div className="bg-blue-100 p-3 rounded-full text-blue-600 mb-4">
              <img
                className="rounded-full"
                src={ahorro}
                alt="Ahorro de tiempo, reduccion de costos."
                width={200}
                height={200}
              />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Ahorro de tiempo y reducción de costos operativos
            </h3>
            <p className="text-gray-600 text-sm">
              La plataforma elimina tareas manuales como la impresión, distribución física y firmas presenciales. Todo
              el proceso se automatiza, reduciendo tiempos de gestión y eliminando costos asociados a papel, archivo y
              mensajería.
            </p>
          </div>

          <div className="bg-gray-100 p-6 rounded-lg shadow-sm flex flex-col items-center text-left relative transform hover:animate-pulsing transition-transform duration-500 ease-in-out">
            <div className="absolute top-4 right-4 bg-blue-500 text-white rounded-full h-8 w-8 flex items-center justify-center text-sm font-semibold">
              02
            </div>
            <div className="bg-blue-100 p-3 rounded-full text-blue-600 mb-4">
              <img className="rounded-full" src={seguridad} alt="Seguridad documental." width={200} height={200} />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Seguridad documental y respaldo continuo</h3>
            <p className="text-gray-600 text-sm">
              Los documentos se almacenan en una infraestructura segura, con acceso controlado, trazabilidad completa de
              usuarios y respaldos automáticos. Esto garantiza la integridad de la información y su disponibilidad ante
              auditorías o fiscalizaciones.
            </p>
          </div>

          <div className="bg-gray-100 p-6 rounded-lg shadow-sm flex flex-col items-center text-left relative transform hover:animate-pulsing transition-transform duration-500 ease-in-out">
            <div className="absolute top-4 right-4 bg-blue-500 text-white rounded-full h-8 w-8 flex items-center justify-center text-sm font-semibold">
              03
            </div>
            <div className="bg-blue-100 p-3 rounded-full text-blue-600 mb-4">
              <img className="rounded-full" src={firma} alt="Firma digital legal." width={200} height={200} />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Firma digital con validez legal oficial</h3>
            <p className="text-gray-600 text-sm">
              La Firma Digital Avanzada (FDA) aplicada por la empresa, mediante un certificado digital emitido por un
              PSC acreditado, otorga a los documentos valor legal equivalente a una firma manuscrita, cumpliendo con lo
              exigido por SUNAFIL, ESSALUD, SUNAT y otras entidades públicas.
            </p>
          </div>
        </div>

        <div className="mt-12">
          <a
            href="#precios"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md transition duration-300"
          >
            Empiece a enviar documentos ahora
          </a>
        </div>
      </div>
    </section>
  );
};
