export default function EstadisticasPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Estadísticas</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600 mb-4">
            Visualiza estadísticas y métricas sobre el uso de la plataforma y la transparencia institucional.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <h3 className="text-2xl font-bold text-blue-600">150</h3>
              <p className="text-gray-600">Instituciones</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <h3 className="text-2xl font-bold text-green-600">2,450</h3>
              <p className="text-gray-600">Documentos</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <h3 className="text-2xl font-bold text-purple-600">1,200</h3>
              <p className="text-gray-600">Consultas</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg text-center">
              <h3 className="text-2xl font-bold text-orange-600">89%</h3>
              <p className="text-gray-600">Respuestas</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}