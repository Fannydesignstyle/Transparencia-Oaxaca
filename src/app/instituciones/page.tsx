export default function InstitucionesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Instituciones</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600 mb-4">
            Explora el directorio completo de instituciones gubernamentales y accede a sus perfiles institucionales.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-lg mb-2">Ministerios</h3>
              <p className="text-gray-600 text-sm">Accede a los perfiles de todos los ministerios del gobierno</p>
            </div>
            <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-lg mb-2">Secretarías</h3>
              <p className="text-gray-600 text-sm">Información de las secretarías de estado</p>
            </div>
            <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-lg mb-2">Municipalidades</h3>
              <p className="text-gray-600 text-sm">Gobiernos locales de todo el país</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}