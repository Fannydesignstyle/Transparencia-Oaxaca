import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const institutionId = searchParams.get("institutionId");
    const code = searchParams.get("code");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    const skip = (page - 1) * limit;

    // Construir la consulta base
    let whereClause: any = { isActive: true };
    
    if (institutionId) {
      whereClause.institutionId = institutionId;
    }
    
    if (code) {
      whereClause.code = code;
    }

    // Obtener códigos QR
    const qrCodes = await db.qRCode.findMany({
      where: whereClause,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        institution: {
          select: {
            id: true,
            name: true,
            type: true,
          },
        },
      },
    });

    // Obtener total de códigos QR para paginación
    const total = await db.qRCode.count({ where: whereClause });

    return NextResponse.json({
      success: true,
      data: qrCodes,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching QR codes:", error);
    return NextResponse.json(
      { success: false, error: "Error al obtener códigos QR" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { institutionId, title, description } = body;

    // Validar campos requeridos
    if (!institutionId || !title) {
      return NextResponse.json(
        { success: false, error: "Institución y título son requeridos" },
        { status: 400 }
      );
    }

    // Verificar que la institución existe
    const institution = await db.institution.findUnique({
      where: { id: institutionId },
    });

    if (!institution) {
      return NextResponse.json(
        { success: false, error: "Institución no encontrada" },
        { status: 404 }
      );
    }

    // Generar código único para el QR
    const code = `QR-${institutionId}-${Date.now()}`;

    // Crear código QR
    const qrCode = await db.qRCode.create({
      data: {
        institutionId,
        code,
        title,
        description,
      },
      include: {
        institution: {
          select: {
            id: true,
            name: true,
            type: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      data: qrCode,
    });
  } catch (error) {
    console.error("Error creating QR code:", error);
    return NextResponse.json(
      { success: false, error: "Error al crear código QR" },
      { status: 500 }
    );
  }
}