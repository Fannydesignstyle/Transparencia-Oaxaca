"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  X, 
  Download, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Maximize, 
  Minimize,
  FileText,
  Image,
  File,
  FileVideo,
  FileAudio,
  Loader2
} from "lucide-react";

interface DocumentViewerProps {
  isOpen: boolean;
  onClose: () => void;
  document: {
    id: string;
    title: string;
    type: string;
    fileUrl: string;
    category: string;
    description: string;
    fileSize: string;
  };
}

export function DocumentViewer({ isOpen, onClose, document }: DocumentViewerProps) {
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detectar si es dispositivo móvil
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setZoom(100);
      setRotation(0);
      setLoading(true);
      setError(null);
      
      // Simular carga del documento
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, document]);

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 25, 25));
  };

  const handleRotate = () => {
    setRotation(prev => (prev + 90) % 360);
  };

  const handleReset = () => {
    setZoom(100);
    setRotation(0);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = document.fileUrl;
    link.download = document.title;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf':
        return <FileText className="w-5 h-5 md:w-6 md:h-6 text-red-500" />;
      case 'html':
        return <FileText className="w-5 h-5 md:w-6 md:h-6 text-blue-500" />;
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return <Image className="w-5 h-5 md:w-6 md:h-6 text-green-500" />;
      case 'mp4':
      case 'avi':
      case 'mov':
        return <FileVideo className="w-5 h-5 md:w-6 md:h-6 text-purple-500" />;
      case 'mp3':
      case 'wav':
        return <FileAudio className="w-5 h-5 md:w-6 md:h-6 text-blue-500" />;
      default:
        return <File className="w-5 h-5 md:w-6 md:h-6 text-gray-500" />;
    }
  };

  const renderDocumentContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-[300px] md:min-h-[400px] lg:min-h-[500px]">
          <div className="text-center">
            <Loader2 className="w-8 h-8 md:w-12 md:h-12 animate-spin text-blue-600 mx-auto mb-4" />
            <p className="text-gray-600 text-sm md:text-base">Cargando documento...</p>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[300px] md:min-h-[400px] lg:min-h-[500px] p-4">
          <FileText className="w-12 h-12 md:w-16 md:h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-4 text-center text-sm md:text-base">No se pudo cargar el documento</p>
          <p className="text-sm text-gray-500 mb-6 text-center max-w-md">{error}</p>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button onClick={handleDownload} className="w-full sm:w-auto">
              <Download className="w-4 h-4 mr-2" />
              Descargar
            </Button>
            <Button variant="outline" onClick={onClose} className="w-full sm:w-auto">
              Cerrar
            </Button>
          </div>
        </div>
      );
    }

    const fileExtension = document.type.toLowerCase();
    const isImageFile = document.fileUrl.match(/\.(jpg|jpeg|png|gif|webp)$/i);
    
    // Para HTMLs
    if (fileExtension === 'html') {
      return (
        <div className="relative w-full min-h-[300px] md:min-h-[400px] lg:min-h-[500px] bg-white rounded-lg overflow-hidden">
          <iframe
            src={document.fileUrl}
            className="w-full h-full border-0"
            style={{
              transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
              transformOrigin: 'center center',
              minHeight: isMobile ? '300px' : '500px'
            }}
            onError={(e) => {
              console.error("Error loading HTML:", e);
              setError("No se pudo cargar el documento HTML");
            }}
            onLoad={() => setLoading(false)}
          />
        </div>
      );
    }
    
    // Para PDFs - usar múltiples métodos para mejor compatibilidad
    if (fileExtension === 'pdf' && !isImageFile) {
      return (
        <div className="relative w-full min-h-[300px] md:min-h-[400px] lg:min-h-[500px] bg-gray-100 rounded-lg overflow-hidden">
          <div className="w-full h-full flex flex-col">
            {/* Intentar con iframe primero */}
            <iframe
              src={document.fileUrl}
              className="flex-1 w-full border-0"
              style={{
                minHeight: isMobile ? '300px' : '500px'
              }}
              onError={(e) => {
                console.error("Error loading PDF with iframe:", e);
                // Si falla el iframe, mostrar controles alternativos
                const fallbackDiv = document.createElement('div');
                fallbackDiv.className = 'flex flex-col items-center justify-center h-full p-4 bg-gray-50';
                fallbackDiv.innerHTML = `
                  <div class="text-center">
                    <svg class="w-16 h-16 text-red-500 mb-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    <p class="text-gray-600 mb-4">Este PDF no puede ser visualizado directamente en el navegador</p>
                    <div class="flex flex-col sm:flex-row gap-2 justify-center">
                      <button onclick="window.open('${document.fileUrl}', '_blank')" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                        Abrir en nueva pestaña
                      </button>
                      <button onclick="document.getElementById('download-${document.id}').click()" class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                        Descargar PDF
                      </button>
                    </div>
                    <a id="download-${document.id}" href="${document.fileUrl}" download="${document.title}" style="display: none;"></a>
                  </div>
                `;
                e.target?.parentNode?.replaceWith(fallbackDiv);
              }}
              onLoad={() => setLoading(false)}
            />
          </div>
        </div>
      );
    }

    // Para imágenes (incluyendo archivos .pdf que son realmente imágenes)
    if (fileExtension === 'pdf' && isImageFile || ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(fileExtension)) {
      return (
        <div className="relative w-full min-h-[300px] md:min-h-[400px] lg:min-h-[500px] bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center p-4">
          <img
            src={document.fileUrl}
            alt={`Vista previa de ${document.title}`}
            className="max-w-full max-h-full object-contain"
            style={{
              transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
              transition: 'transform 0.3s ease',
              maxHeight: isMobile ? '250px' : '400px'
            }}
            onError={(e) => {
              console.error("Error loading image:", e);
              setError("No se pudo cargar la imagen");
            }}
            onLoad={() => setLoading(false)}
          />
        </div>
      );
    }

    // Para videos
    if (['mp4', 'avi', 'mov'].includes(fileExtension)) {
      return (
        <div className="relative w-full min-h-[300px] md:min-h-[400px] lg:min-h-[500px] bg-gray-100 rounded-lg overflow-hidden">
          <video
            src={document.fileUrl}
            controls
            className="w-full h-full object-cover"
            style={{
              minHeight: isMobile ? '300px' : '500px'
            }}
            onError={() => setError("No se pudo cargar el video")}
            onLoadedData={() => setLoading(false)}
          />
        </div>
      );
    }

    // Para audio
    if (['mp3', 'wav'].includes(fileExtension)) {
      return (
        <div className="relative w-full min-h-[300px] md:min-h-[400px] lg:min-h-[500px] bg-gray-100 rounded-lg overflow-hidden flex flex-col items-center justify-center p-4">
          <FileAudio className="w-16 h-16 md:w-20 md:h-20 text-blue-500 mb-4" />
          <audio
            src={document.fileUrl}
            controls
            className="w-full max-w-md"
            onError={() => setError("No se pudo cargar el audio")}
            onLoadedData={() => setLoading(false)}
          />
        </div>
      );
    }

    // Para otros formatos - mostrar vista previa con opción de descarga
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] md:min-h-[400px] lg:min-h-[500px] bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 p-4">
        {getFileIcon(document.type)}
        <h3 className="text-lg md:text-xl font-medium mt-4 mb-2 text-center">{document.title}</h3>
        <p className="text-gray-600 mb-6 text-center text-sm md:text-base max-w-md">Este tipo de archivo no puede ser visualizado en línea</p>
        <div className="flex flex-col sm:flex-row gap-2 w-full max-w-xs">
          <Button onClick={handleDownload} className="flex-1">
            <Download className="w-4 h-4 mr-2" />
            Descargar
          </Button>
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cerrar
          </Button>
        </div>
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-2 md:p-4 ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
      <Card className={`w-full max-w-4xl max-h-[90vh] overflow-hidden ${isFullscreen ? 'w-full h-full max-w-none max-h-none rounded-none' : ''}`}>
        {/* Header responsivo */}
        <CardHeader className="flex flex-col space-y-3 md:space-y-0 md:flex-row md:items-center md:justify-between p-4 md:pb-4">
          <div className="flex items-center space-x-3 min-w-0 flex-1">
            {getFileIcon(document.type)}
            <div className="min-w-0 flex-1">
              <CardTitle className="text-base md:text-lg leading-tight truncate pr-2">
                {document.title}
              </CardTitle>
              <div className="flex flex-wrap items-center gap-1 md:gap-2 mt-1">
                <Badge variant="outline" className="text-xs">{document.type}</Badge>
                <Badge variant="secondary" className="text-xs">{document.category}</Badge>
                <span className="text-xs text-gray-500 truncate">{document.fileSize}</span>
              </div>
            </div>
          </div>
          
          {/* Controles responsivos */}
          <div className="flex flex-wrap gap-1 md:gap-2">
            {/* Zoom controls - ocultar en móvil muy pequeño */}
            <div className="hidden sm:flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleZoomOut}
                disabled={zoom <= 25}
                className="h-8 w-8 p-0"
              >
                <ZoomOut className="w-4 h-4" />
              </Button>
              <span className="text-xs font-medium min-w-[2.5rem] text-center">{zoom}%</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleZoomIn}
                disabled={zoom >= 200}
                className="h-8 w-8 p-0"
              >
                <ZoomIn className="w-4 h-4" />
              </Button>
            </div>
            
            {/* Otros controles */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRotate}
              className="h-8 w-8 p-0"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="h-8 w-8 p-0"
            >
              <Minimize className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleFullscreen}
              className="h-8 w-8 p-0"
            >
              {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDownload}
              className="h-8 w-8 p-0"
            >
              <Download className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          <div className="p-2 md:p-6">
            {renderDocumentContent()}
          </div>
          <div className="border-t bg-gray-50 p-3 md:p-4">
            <p className="text-xs md:text-sm text-gray-600 line-clamp-2">
              {document.description}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}