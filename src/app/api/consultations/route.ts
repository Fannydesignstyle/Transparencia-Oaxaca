import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const institutionId = searchParams.get("institutionId");
    const status = searchParams.get("status");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    const skip = (page - 1) * limit;

    // Construir la consulta base
    let whereClause: any = {};
    
    if (institutionId) {
      whereClause.institutionId = institutionId;
    }
    
    if (status) {
      whereClause.status = status;
    }

    // Obtener consultas públicas
    const consultations = await db.consultation.findMany({
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
        _count: {
          select: {
            votes: true,
          },
        },
      },
    });

    // Obtener total de consultas para paginación
    const total = await db.consultation.count({ where: whereClause });

    return NextResponse.json({
      success: true,
      data: consultations,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching consultations:", error);
    return NextResponse.json(
      { success: false, error: "Error al obtener consultas públicas" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { institutionId, title, description, startDate, endDate } = body;

    // Validar campos requeridos
    if (!institutionId || !title || !description || !startDate || !endDate) {
      return NextResponse.json(
        { success: false, error: "Todos los campos son requeridos" },
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

    // Validar fechas
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (start >= end) {
      return NextResponse.json(
        { success: false, error: "La fecha de inicio debe ser anterior a la fecha de fin" },
        { status: 400 }
      );
    }

    // Crear consulta pública
    const consultation = await db.consultation.create({
      data: {
        institutionId,
        title,
        description,
        startDate: start,
        endDate: end,
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
      data: consultation,
    });
  } catch (error) {
    console.error("Error creating consultation:", error);
    return NextResponse.json(
      { success: false, error: "Error al crear consulta pública" },
      { status: 500 }
    );
  }
}