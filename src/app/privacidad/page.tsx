export default function PrivacidadPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Política de Privacidad</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-3">1. Información que Recopilamos</h3>
              <p className="text-gray-600">
                Recopilamos información personal que usted nos proporciona directamente, como nombre, dirección de correo electrónico 
                y otros datos de contacto cuando se registra o utiliza nuestros servicios.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-3">2. Uso de la Información</h3>
              <p className="text-gray-600">
                Utilizamos su información para proporcionar y mejorar nuestros servicios, comunicarnos con usted, 
                y facilitar su participación en las consultas ciudadanas.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-3">3. Protección de Datos</h3>
              <p className="text-gray-600">
                Implementamos medidas de seguridad técnicas y organizativas adecuadas para proteger su información personal 
                contra acceso no autorizado, pérdida o destrucción.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-3">4. Compartir Información</h3>
              <p className="text-gray-600">
                No vendemos, alquilamos ni compartimos su información personal con terceros sin su consentimiento, 
                excepto cuando sea necesario para cumplir con la ley o proteger nuestros derechos.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-3">5. Derechos del Usuario</h3>
              <p className="text-gray-600">
                Usted tiene derecho a acceder, corregir, eliminar o limitar el uso de su información personal. 
                Puede ejercer estos derechos contactándonos a través de nuestros canales de atención.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-3">6. Cookies</h3>
              <p className="text-gray-600">
                Utilizamos cookies para mejorar su experiencia en nuestra plataforma. Puede configurar su navegador 
                para rechazar cookies, pero esto puede afectar algunas funcionalidades del sitio.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}