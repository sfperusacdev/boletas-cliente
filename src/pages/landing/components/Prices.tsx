export const Prices = () => {
  return (
    <section id="precios" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4 mt-10">
            PLANES DISPONIBLES SEGÚN TUS NECESIDADES
          </h2>
          <p className="text-lg text-gray-600">
            Nuestra solución se adapta a distintos niveles de operación. Por
            eso, ofrecemos dos planes claros y flexibles para cubrir desde
            necesidades básicas de distribución documental, hasta requerimientos
            avanzados con firma electrónica, trazabilidad y validez legal plena.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-15">
          <PlanCard
            title="Plan Esencial"
            price="$10.00"
            description="Para pequeñas empresas que necesitan distribuir documentos laborales de forma eficiente y ordenada."
            features={[
              { text: "Almacenamiento: Google Drive", included: true },
              { text: "Usuarios hasta 300 Colaboradores", included: true },
              { text: "Setup inicial", included: true },
              { text: "Firma del trabajador", included: false },
              { text: "Firma digital de la empresa", included: false },
              { text: "Equivalencia legal", included: false },
              { text: "Escalabilidad", included: false },
            ]}
            link="https://wa.link/va9v0l"
            highlighted={false}
          />

          <PlanCard
            title="Plan Corporativo"
            price="$25"
            description="Legalidad en la gestión documental, firmas electrónicas, reportes que cumplir con entidades como SUNAFIL y ESSALUD."
            features={[
              {
                text: "Almacenamiento: respaldo y trazabilidad",
                included: true,
              },
              {
                text: "Firma del trabajador: Firma Electrónica Simple (FES)",
                included: true,
              },
              {
                text: "Firma digital de la empresa: Firma Digital Avanzada (FDA), emitido por un PSC acreditado.",
                included: true,
              },
              {
                text: "Equivalencia legal: Cumple con la Ley N.º 27269 (Ley de Firmas y Certificados Digitales) y el DS N.º 052-2008-PCM,",
                included: true,
              },
              {
                text: "Usuarios incluidos: hasta 500 Colaboradores",
                included: true,
              },
              {
                text: "Escalabilidad: usuarios adicionales USD 0.05 Colaborador/mes",
                included: true,
              },
              { text: "Setup inicial", included: true },
            ]}
            link="https://wa.link/olb1uq"
            highlighted={true}
          />

          <PlanCard
            title="Personalizado"
            price="$--"
            description="Paquete a tu medida"
            features={[
              { text: "Almacenamiento", included: true },
              { text: "Firma del trabajador", included: true },
              { text: "Firma digital de la empresa", included: true },
              { text: "Equivalencia legal", included: true },
              { text: "Usuarios incluidos", included: true },
              { text: "Escalabilidad", included: true },
              { text: "Setup inicial", included: true },
            ]}
            link="https://wa.link/wsa9xr"
            highlighted={false}
          />
        </div>
      </div>
    </section>
  );
};

type Feature = { text: string; included: boolean };

interface PlanCardProps {
  title: string;
  price: string;
  description: string;
  features: Feature[];
  link: string;
  highlighted: boolean;
}

const PlanCard = ({
  title,
  price,
  description,
  features,
  link,
  highlighted,
}: PlanCardProps) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-lg p-8 flex flex-col items-center border ${
        highlighted ? "border-blue-600 scale-105" : "border-gray-200"
      } transform hover:animate-scale transition-transform duration-500 ease-in-out`}
    >
      <h3 className="text-2xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-500 mb-4 text-center">{description}</p>
      <div className="text-4xl font-bold text-gray-900 mb-6">
        {price} <span className="text-xl text-gray-600">/mes</span>
      </div>
      <ul className="text-left w-full mb-8 space-y-3">
        {features.map((f, idx) => (
          <li key={idx} className="flex items-center text-gray-700">
            {f.included ? (
              <svg
                className="w-5 h-5 text-green-500 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5 text-red-500 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            )}
            {f.text}
          </li>
        ))}
      </ul>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className={`mt-auto px-6 py-3 ${
          highlighted
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "border border-blue-600 text-blue-600 hover:bg-blue-50"
        } rounded-md transition duration-300 ${highlighted ? "" : "inline-block text-center"}`}
      >
        Empieza hoy
      </a>
    </div>
  );
};
