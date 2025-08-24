export default function ContactoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Contacto</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600 mb-6">
            Ponte en contacto con nosotros para obtener ayuda o reportar problemas.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-lg mb-4">Información de Contacto</h3>
              <div className="space-y-3">
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-gray-600">FannyDesignStyle@outlook.com</p>
                </div>
                <div>
                  <p className="font-medium">Teléfono</p>
                  <p className="text-gray-600">951 743 92 04</p>
                </div>
                <div>
                  <p className="font-medium">Horario de Atención</p>
                  <p className="text-gray-600">Lunes a Viernes: 9:00 - 18:00</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Envíanos un Mensaje</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Nombre</label>
                  <input type="text" className="w-full border rounded px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input type="email" className="w-full border rounded px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Mensaje</label>
                  <textarea className="w-full border rounded px-3 py-2 h-24"></textarea>
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                  Enviar Mensaje
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}