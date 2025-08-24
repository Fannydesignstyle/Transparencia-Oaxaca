export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Preguntas Frecuentes (FAQ)</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600 mb-6">
            Encuentra respuestas a las preguntas más comunes sobre la plataforma.
          </p>
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">¿Qué es Transparencia Conectada?</h3>
              <p className="text-gray-600">Es una plataforma digital que democratiza el acceso a la información gubernamental y fomenta la participación ciudadana.</p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">¿Cómo puedo acceder a la información de las instituciones?</h3>
              <p className="text-gray-600">Puedes buscar instituciones por nombre, categoría o navegar por el directorio completo en la sección de instituciones.</p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">¿Es gratuita la plataforma?</h3>
              <p className="text-gray-600">Sí, Transparencia Conectada es completamente gratuita para todos los ciudadanos.</p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">¿Cómo puedo participar en las consultas públicas?</h3>
              <p className="text-gray-600">Debes registrarte en la plataforma y luego podrás participar en las consultas públicas activas.</p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">¿La información está actualizada?</h3>
              <p className="text-gray-600">Sí, las instituciones actualizan su información regularmente para garantizar que los datos estén siempre al día.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}