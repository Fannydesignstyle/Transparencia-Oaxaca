export default function DocumentosPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Documentos</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600 mb-4">
            Accede a todos los documentos públicos de las instituciones gubernamentales.
          </p>
          <div className="space-y-4">
            <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-lg mb-2">Presupuestos</h3>
              <p className="text-gray-600 text-sm">Presupuestos anuales de todas las instituciones</p>
            </div>
            <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-lg mb-2">Informes de Actividades</h3>
              <p className="text-gray-600 text-sm">Informes periódicos de actividades institucionales</p>
            </div>
            <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-lg mb-2">Planes Estratégicos</h3>
              <p className="text-gray-600 text-sm">Planificación estratégica de las instituciones</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}