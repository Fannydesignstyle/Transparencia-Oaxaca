export default function AyudaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Ayuda</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600 mb-6">
            Encuentra respuestas a las preguntas más frecuentes y obtén ayuda para usar la plataforma.
          </p>
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">¿Cómo buscar instituciones?</h3>
              <p className="text-gray-600">Usa el buscador principal o navega por las categorías en la sección de instituciones.</p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">¿Cómo enviar una consulta?</h3>
              <p className="text-gray-600">Ve a la sección de participación ciudadana y selecciona "Enviar Consulta".</p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">¿Cómo usar los códigos QR?</h3>
              <p className="text-gray-600">Escanea los códigos QR con tu dispositivo móvil para acceder rápidamente a la información.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}