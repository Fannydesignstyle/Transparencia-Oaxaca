export default function AccesibilidadPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Accesibilidad</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600 mb-6">
            Nuestro compromiso con la accesibilidad web para garantizar que todas las personas puedan usar nuestra plataforma.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-3">Nuestro Compromiso</h3>
              <p className="text-gray-600 mb-4">
                Nos esforzamos por hacer que nuestra plataforma sea accesible para todas las personas, 
                independientemente de sus capacidades o discapacidades.
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Diseño responsivo para todos los dispositivos</li>
                <li>Navegación por teclado completa</li>
                <li>Contraste adecuado para lectura</li>
                <li>Descripciones alternativas en imágenes</li>
              </ul>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-3">Características Accesibles</h3>
              <p className="text-gray-600 mb-4">
                Implementamos diversas características para mejorar la accesibilidad de nuestra plataforma.
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Estructura semántica HTML5</li>
                <li>Etiquetas ARIA apropiadas</li>
                <li>Tamaños de letra ajustables</li>
                <li>Enfoque visible para navegación</li>
              </ul>
            </div>
          </div>
          <div className="mt-6 border rounded-lg p-4">
            <h3 className="font-semibold text-lg mb-3">Herramientas de Accesibilidad</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-3 rounded text-center">
                <h4 className="font-medium mb-2">Lector de Pantalla</h4>
                <p className="text-sm text-gray-600">Compatible con lectores de pantalla</p>
              </div>
              <div className="bg-green-50 p-3 rounded text-center">
                <h4 className="font-medium mb-2">Zoom</h4>
                <p className="text-sm text-gray-600">Zoom hasta 200% sin pérdida</p>
              </div>
              <div className="bg-purple-50 p-3 rounded text-center">
                <h4 className="font-medium mb-2">Alto Contraste</h4>
                <p className="text-sm text-gray-600">Modo de alto contraste disponible</p>
              </div>
              <div className="bg-orange-50 p-3 rounded text-center">
                <h4 className="font-medium mb-2">Teclado</h4>
                <p className="text-sm text-gray-600">Navegación completa por teclado</p>
              </div>
            </div>
          </div>
          <div className="mt-6 border rounded-lg p-4">
            <h3 className="font-semibold text-lg mb-3">Contacto para Accesibilidad</h3>
            <p className="text-gray-600 mb-4">
              Si encuentra alguna dificultad para acceder a nuestra plataforma, por favor contáctenos:
            </p>
            <div className="space-y-2">
              <p><strong>Email:</strong> accesibilidad@transparenciaconectada.gov</p>
              <p><strong>Teléfono:</strong> +1 234 567 890 ext. 123</p>
              <p><strong>Horario:</strong> Lunes a Viernes, 9:00 - 18:00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}