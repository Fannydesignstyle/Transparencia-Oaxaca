export default function TerminosPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Términos de Uso</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-3">1. Aceptación de los Términos</h3>
              <p className="text-gray-600">
                Al acceder y utilizar esta plataforma, usted acepta y se compromete a cumplir con estos términos y condiciones.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-3">2. Uso de la Plataforma</h3>
              <p className="text-gray-600">
                Esta plataforma está diseñada para proporcionar acceso a información pública gubernamental y facilitar la participación ciudadana.
                Se prohíbe el uso para fines ilegales o no autorizados.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-3">3. Responsabilidades del Usuario</h3>
              <p className="text-gray-600">
                Los usuarios se comprometen a utilizar la plataforma de manera responsable, respetando las normas de conducta 
                y proporcionando información veraz cuando sea requerido.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-3">4. Propiedad Intelectual</h3>
              <p className="text-gray-600">
                El contenido de esta plataforma, incluyendo textos, gráficos, logos e imágenes, es propiedad de Transparencia Conectada 
                o de sus respectivos titulares y está protegido por las leyes de propiedad intelectual.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-3">5. Limitación de Responsabilidad</h3>
              <p className="text-gray-600">
                Transparencia Conectada no se responsabiliza por el uso que los usuarios hagan de la información proporcionada 
                ni por las decisiones tomadas basadas en dicha información.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-3">6. Modificaciones</h3>
              <p className="text-gray-600">
                Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios serán notificados 
                a través de la plataforma.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}