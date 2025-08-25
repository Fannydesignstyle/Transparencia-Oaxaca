"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { QrCode, Search, Filter, Download, Smartphone, Copy, ExternalLink } from "lucide-react";
import { Institution, QRCode as QRCodeType } from "@/types";

interface QRSectionProps {
  institutions: Institution[];
  qrCodes: QRCodeType[];
}

export default function QRSection({ institutions, qrCodes }: QRSectionProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedInstitution, setSelectedInstitution] = useState("");
  const [selectedQR, setSelectedQR] = useState<QRCodeType | null>(null);
  const [filteredQRCodes, setFilteredQRCodes] = useState<QRCodeType[]>(qrCodes);
  const [scannedCode, setScannedCode] = useState("");

  // Obtener nombres de instituciones únicos
  const institutionNames = Array.from(new Set(institutions.map(inst => inst.name)));

  // Filtrar códigos QR basado en búsqueda e institución
  useEffect(() => {
    let filtered = qrCodes;

    if (searchTerm) {
      filtered = filtered.filter(qr =>
        qr.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        qr.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        qr.code.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedInstitution) {
      const institution = institutions.find(inst => inst.name === selectedInstitution);
      if (institution) {
        filtered = filtered.filter(qr => qr.institutionId === institution.id);
      }
    }

    setFilteredQRCodes(filtered);
  }, [searchTerm, selectedInstitution, qrCodes, institutions]);

  const handleQRClick = (qr: QRCodeType) => {
    setSelectedQR(qr);
  };

  const handleScanCode = () => {
    if (scannedCode) {
      const foundQR = qrCodes.find(qr => qr.code === scannedCode);
      if (foundQR) {
        setSelectedQR(foundQR);
      } else {
        alert("Código QR no encontrado");
      }
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Código copiado al portapapeles");
  };

  const downloadQR = (qr: QRCodeType) => {
    // En una implementación real, esto generaría y descargaría la imagen QR
    alert(`Descargando código QR: ${qr.title}`);
  };

  const getInstitutionName = (institutionId: string) => {
    const institution = institutions.find(inst => inst.id === institutionId);
    return institution?.name || "Institución desconocida";
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
          <QrCode className="w-8 h-8 mr-3 text-green-500" />
          Códigos QR
        </h2>
        <p className="text-gray-600 mb-6">
          Escanea códigos QR para acceder rápidamente a la información de cualquier institución.
          Comparte fácilmente los códigos para promover la transparencia en tu comunidad.
        </p>

        {/* Escáner de código QR */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Smartphone className="w-5 h-5 mr-2 text-blue-500" />
              Escanear Código QR
            </CardTitle>
            <CardDescription>
              Ingresa el código QR escaneado para acceder a la información
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Input
                placeholder="Ingresa el código QR escaneado"
                value={scannedCode}
                onChange={(e) => setScannedCode(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleScanCode}>
                <Search className="w-4 h-4 mr-2" />
                Buscar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Filtros */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Buscar códigos QR..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="w-full md:w-64">
            <Select value={selectedInstitution} onValueChange={setSelectedInstitution}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por institución" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todas las instituciones</SelectItem>
                {institutionNames.map((name) => (
                  <SelectItem key={name} value={name}>
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button variant="outline" onClick={() => {
            setSearchTerm("");
            setSelectedInstitution("");
            setSelectedQR(null);
            setScannedCode("");
          }}>
            <Filter className="w-4 h-4 mr-2" />
            Limpiar filtros
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lista de códigos QR */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Códigos QR ({filteredQRCodes.length})</CardTitle>
              <CardDescription>
                Selecciona un código QR para ver detalles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {filteredQRCodes.map((qr) => (
                  <div
                    key={qr.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors hover:bg-gray-50 ${
                      selectedQR?.id === qr.id ? "border-green-500 bg-green-50" : ""
                    }`}
                    onClick={() => handleQRClick(qr)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{qr.title}</h3>
                      <Badge variant={qr.isActive ? "default" : "secondary"}>
                        {qr.isActive ? "Activo" : "Inactivo"}
                      </Badge>
                    </div>
                    {qr.description && (
                      <p className="text-sm text-gray-600 mb-2 overflow-hidden">
                        {qr.description}
                      </p>
                    )}
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{getInstitutionName(qr.institutionId)}</span>
                      <span>{qr.code}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detalles del código QR */}
        <div className="lg:col-span-2">
          {selectedQR ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <QrCode className="w-6 h-6 mr-2 text-green-500" />
                  {selectedQR.title}
                </CardTitle>
                <CardDescription>
                  <Badge variant={selectedQR.isActive ? "default" : "secondary"}>
                    {selectedQR.isActive ? "Activo" : "Inactivo"}
                  </Badge>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Información del código QR */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Información del Código</h3>
                    <div className="space-y-3">
                      <div>
                        <span className="font-medium text-sm text-gray-600">Código:</span>
                        <div className="flex items-center gap-2">
                          <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                            {selectedQR.code}
                          </code>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(selectedQR.code)}
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <div>
                        <span className="font-medium text-sm text-gray-600">Institución:</span>
                        <p className="text-gray-900">{getInstitutionName(selectedQR.institutionId)}</p>
                      </div>
                      {selectedQR.description && (
                        <div>
                          <span className="font-medium text-sm text-gray-600">Descripción:</span>
                          <p className="text-gray-900">{selectedQR.description}</p>
                        </div>
                      )}
                      <div>
                        <span className="font-medium text-sm text-gray-600">Estado:</span>
                        <p className="text-gray-900">
                          {selectedQR.isActive ? "Activo" : "Inactivo"}
                        </p>
                      </div>
                      <div>
                        <span className="font-medium text-sm text-gray-600">Creado:</span>
                        <p className="text-gray-900">
                          {new Date(selectedQR.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Vista previa del QR y acciones */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Código QR</h3>
                    <div className="bg-gray-100 rounded-lg p-6 mb-4 flex items-center justify-center">
                      <div className="w-48 h-48 bg-white rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                        <QrCode className="w-24 h-24 text-gray-400" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Button 
                        className="w-full" 
                        onClick={() => downloadQR(selectedQR)}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Descargar Código QR
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => copyToClipboard(selectedQR.code)}
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Copiar Código
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => {
                          const institution = institutions.find(inst => inst.id === selectedQR.institutionId);
                          if (institution) {
                            // En una implementación real, esto navegaría al perfil de la institución
                            alert(`Navegando al perfil de: ${institution.name}`);
                          }
                        }}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Ver Institución
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center py-16">
                <div className="text-center">
                  <QrCode className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Selecciona un código QR
                  </h3>
                  <p className="text-gray-600">
                    Elige un código QR de la lista para ver sus detalles y descargarlo.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}