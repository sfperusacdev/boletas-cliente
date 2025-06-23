export const Hero = () => {
  return (
    <section
      id="inicio"
      className="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-30 md:py-30 overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="w-full lg:w-1/2 text-center lg:text-left animate-fade-in-up animate-delay-200">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
              Envíos rápidos <br className="hidden md:inline" /> <span className="text-blue-600">Firmas</span> Seguras
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-lg mx-auto lg:mx-0">
              Firme, documentos de forma legal y segura desde cualquier lugar y dispositivo. Ahorre tiempo, reduzca el
              desperdicio de papel y agilice su flujo de trabajo documental.
            </p>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mb-10">
              <a
                href="#precios"
                className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 animate-fade-in animate-delay-400"
              >
                Saber más…
              </a>
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end animate-fade-in-right animate-delay-700">
            <div className="relative bg-white rounded-3xl shadow-2xl p-6 md:p-8 max-w-md w-full border border-gray-100 transform rotate-3 hover:rotate-0 transition-transform duration-500 ease-in-out">
              <span className="absolute top-4 right-4 bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                Legalmente vinculante
              </span>

              <div className="flex items-center mb-6 pt-4">
                <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="font-medium text-gray-800">Documento listo para firmar</span>
                <span className="ml-auto text-gray-500 text-sm">Hoy</span>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h3 className="font-bold text-gray-900 mb-1">Gratificaciones</h3>
                <p className="text-sm text-gray-600">Por favor revise y firme.</p>
              </div>

              <div className="border border-dashed border-gray-300 rounded-lg flex items-center justify-center h-48 bg-gray-50 mb-6">
                <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>

              <div className="mb-6">
                <p className="text-sm text-gray-700 font-medium mb-2">Se requiere firma</p>
                <div className="relative p-3 border-2 border-dashed border-blue-300 rounded-lg bg-blue-50 text-center">
                  <span className="absolute top-2 right-2 bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full">
                    Tu turno
                  </span>
                  <button className="text-blue-600 font-semibold hover:underline mt-2">
                    Haga clic aquí para firmar
                  </button>
                </div>
              </div>

              <button className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl shadow-md hover:bg-blue-700 transition-colors duration-300">
                Firmar documento
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
