export default function TutorialesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Tutoriales</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600 mb-6">
            Aprende a usar todas las características de la plataforma con nuestros tutoriales paso a paso.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-lg mb-2">Tutorial: Navegación Básica</h3>
              <p className="text-gray-600 text-sm mb-4">Aprende a moverte por la plataforma y encontrar lo que necesitas.</p>
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Ver Tutorial
              </button>
            </div>
            <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-lg mb-2">Tutorial: Participación Ciudadana</h3>
              <p className="text-gray-600 text-sm mb-4">Cómo enviar consultas y participar en las decisiones.</p>
              <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">
                Ver Tutorial
              </button>
            </div>
            <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-lg mb-2">Tutorial: Uso de Códigos QR</h3>
              <p className="text-gray-600 text-sm mb-4">Escanea y usa los códigos QR para acceder rápidamente.</p>
              <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                Ver Tutorial
              </button>
            </div>
            <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-lg mb-2">Tutorial: Acceso a Documentos</h3>
              <p className="text-gray-600 text-sm mb-4">Encuentra y descarga documentos institucionales.</p>
              <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
                Ver Tutorial
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}