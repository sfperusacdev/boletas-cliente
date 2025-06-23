export const Footer = () => {
  return (
    <footer className="bg-[#0d263b] text-white py-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-lg font-semibold mb-2">NoticicaSF</h2>
          <p className="text-sm">
            En SOLUCIONES INFORMÁTICAS SF PERÚ S.A.C., estamos comprometidos con brindar tecnología que genere
            eficiencia, seguridad y cumplimiento legal en los procesos de su organización.
          </p>
        </div>

        <div className="flex flex-col items-center">
          <h3 className="text-base font-semibold mb-2">Navegación</h3>
          <ul className="text-sm space-y-1">
            <li>
              <a href="#inicio">Inicio</a>
            </li>
            <li>
              <a href="#soluciones">Solución</a>
            </li>
            <li>
              <a href="#beneficios">Beneficios</a>
            </li>
            <li>
              <a href="#precios">Precios</a>
            </li>
          </ul>
        </div>

        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-base font-semibold mb-2">Contáctanos</h3>
          <p className="text-sm">soporte@sfperusac.com</p>
          <p className="text-sm">Lunes a Viernes, 8AM - 7PM</p>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-700 text-center text-sm py-4">
        © Soluciones Informáticas SF Perú S.A.C. 2025
      </div>
    </footer>
  );
};
