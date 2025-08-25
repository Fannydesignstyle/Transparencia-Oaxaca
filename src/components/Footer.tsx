import Link from "next/link";
import { 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram,
  Linkedin,
  FileText,
  Shield,
  Eye,
  Info
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="relative w-10 h-10">
                <img
                  src="/logo-transparencia.png"
                  alt="Transparencia Conectada"
                  className="object-contain w-full h-full"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold">TRANSPARENCIA CONECTADA</h3>
                <p className="text-sm text-gray-400">Plataforma Digital</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Plataforma digital que acerca la información pública a la ciudadanía, 
              promoviendo la transparencia y la participación activa en la gestión pública.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold flex items-center">
              <Building2 className="w-5 h-5 mr-2" />
              Enlaces Rápidos
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/instituciones" className="text-gray-300 hover:text-white transition-colors text-sm flex items-center">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Instituciones
                </Link>
              </li>
              <li>
                <Link href="/documentos" className="text-gray-300 hover:text-white transition-colors text-sm flex items-center">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Documentos
                </Link>
              </li>
              <li>
                <Link href="/participacion" className="text-gray-300 hover:text-white transition-colors text-sm flex items-center">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Participación Ciudadana
                </Link>
              </li>
              <li>
                <Link href="/estadisticas" className="text-gray-300 hover:text-white transition-colors text-sm flex items-center">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Estadísticas
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Information */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              Información Legal
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/terminos" className="text-gray-300 hover:text-white transition-colors text-sm flex items-center">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Términos de Servicio
                </Link>
              </li>
              <li>
                <Link href="/privacidad" className="text-gray-300 hover:text-white transition-colors text-sm flex items-center">
                  <Shield className="w-4 h-4 mr-2" />
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link href="/accesibilidad" className="text-gray-300 hover:text-white transition-colors text-sm flex items-center">
                  <Eye className="w-4 h-4 mr-2" />
                  Accesibilidad
                </Link>
              </li>
              <li>
                <Link href="/transparencia" className="text-gray-300 hover:text-white transition-colors text-sm flex items-center">
                  <Info className="w-4 h-4 mr-2" />
                  Transparencia
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold flex items-center">
              <Mail className="w-5 h-5 mr-2" />
              Contacto
            </h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300 text-sm">
                  Oaxaca, México
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300 text-sm">
                  9517439204
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300 text-sm">
                  fannydesignstyle@outlook.com
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Legal Notice */}
      <div className="bg-gray-800 border-t border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm mb-2">
                📃 <strong>Aviso Legal:</strong> Esta plataforma digital es una iniciativa independiente de cualquier dependencia de gobierno. 
                Es un proyecto ciudadano creado para fines democráticos, promoviendo la transparencia y la participación ciudadana. 
                El contenido publicado es de carácter informativo y esta plataforma opera de manera autónoma.
              </p>
              <p className="text-gray-400 text-sm">
                © 2024 TRANSPARENCIA CONECTADA. Todos los derechos reservados.
              </p>
            </div>
            <div className="flex items-center space-x-4 text-gray-400 text-sm">
              <span>Version 1.0.0</span>
              <span>•</span>
              <span>Última actualización: Noviembre 2024</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-950 border-t border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
            <p className="text-gray-500 text-xs text-center md:text-left">
              Esta plataforma opera bajo los principios de transparencia, rendición de cuentas y participación ciudadana 
              como iniciativa independiente para fortalecer la democracia y el acceso a la información.
            </p>
            <div className="flex items-center space-x-4 text-gray-500 text-xs">
              <Link href="/ayuda" className="hover:text-gray-300 transition-colors">Ayuda</Link>
              <span>•</span>
              <Link href="/faq" className="hover:text-gray-300 transition-colors">Preguntas Frecuentes</Link>
              <span>•</span>
              <Link href="/contacto" className="hover:text-gray-300 transition-colors">Contacto</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Helper component for arrow icon
function ArrowRight({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );
}