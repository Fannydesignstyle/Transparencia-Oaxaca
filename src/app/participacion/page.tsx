export default function ParticipacionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Participación Ciudadana</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600 mb-4">
            Participa activamente en la gestión pública a través de diferentes canales de comunicación y consulta.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">Consultas y Sugerencias</h3>
              <p className="text-gray-600 text-sm mb-4">Envía tus consultas, sugerencias y reclamos a las instituciones</p>
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Enviar Consulta
              </button>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">Consultas Públicas</h3>
              <p className="text-gray-600 text-sm mb-4">Participa en las consultas públicas abiertas</p>
              <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">
                Ver Consultas Activas
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}