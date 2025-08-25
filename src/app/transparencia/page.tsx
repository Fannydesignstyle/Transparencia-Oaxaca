export default function TransparenciaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Transparencia</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600 mb-6">
            Conoce nuestro compromiso con la transparencia y cómo garantizamos el acceso a la información pública.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-3">Nuestro Compromiso</h3>
              <p className="text-gray-600 mb-4">
                Nos comprometemos a proporcionar acceso libre y gratuito a la información pública, 
                garantizando la transparencia en la gestión gubernamental.
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Información actualizada y verificada</li>
                <li>Acceso libre sin restricciones</li>
                <li>Formatos accesibles para todos</li>
                <li>Procesos claros y documentados</li>
              </ul>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-3">Mecanismos de Transparencia</h3>
              <p className="text-gray-600 mb-4">
                Implementamos diversos mecanismos para garantizar la transparencia en todas nuestras operaciones.
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Publicación proactiva de información</li>
                <li>Respuestas a solicitudes ciudadanas</li>
                <li>Informes periódicos de actividades</li>
                <li>Participación ciudadana activa</li>
              </ul>
            </div>
          </div>
          <div className="mt-6 border rounded-lg p-4">
            <h3 className="font-semibold text-lg mb-3">Información Pública Disponible</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-3 rounded">
                <h4 className="font-medium mb-2">Presupuestos</h4>
                <p className="text-sm text-gray-600">Acceso a todos los presupuestos institucionales</p>
              </div>
              <div className="bg-green-50 p-3 rounded">
                <h4 className="font-medium mb-2">Contrataciones</h4>
                <p className="text-sm text-gray-600">Información sobre procesos de contratación</p>
              </div>
              <div className="bg-purple-50 p-3 rounded">
                <h4 className="font-medium mb-2">Informes</h4>
                <p className="text-sm text-gray-600">Informes de gestión y actividades</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}