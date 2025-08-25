import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const institutionId = searchParams.get("institutionId");
    const userId = searchParams.get("userId");
    const status = searchParams.get("status");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    const skip = (page - 1) * limit;

    // Construir la consulta base
    let whereClause: any = {};
    
    if (institutionId) {
      whereClause.institutionId = institutionId;
    }
    
    if (userId) {
      whereClause.userId = userId;
    }
    
    if (status) {
      whereClause.status = status;
    }

    // Obtener consultas
    const inquiries = await db.inquiry.findMany({
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
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    // Obtener total de consultas para paginación
    const total = await db.inquiry.count({ where: whereClause });

    return NextResponse.json({
      success: true,
      data: inquiries,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching inquiries:", error);
    return NextResponse.json(
      { success: false, error: "Error al obtener consultas ciudadanas" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { institutionId, subject, content, userId } = body;

    // Validar campos requeridos
    if (!institutionId || !subject || !content) {
      return NextResponse.json(
        { success: false, error: "Institución, asunto y contenido son requeridos" },
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

    // Si se proporciona userId, verificar que el usuario existe
    if (userId) {
      const user = await db.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        return NextResponse.json(
          { success: false, error: "Usuario no encontrado" },
          { status: 404 }
        );
      }
    }

    // Crear consulta
    const inquiry = await db.inquiry.create({
      data: {
        institutionId,
        subject,
        content,
        userId,
      },
      include: {
        institution: {
          select: {
            id: true,
            name: true,
            type: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      data: inquiry,
    });
  } catch (error) {
    console.error("Error creating inquiry:", error);
    return NextResponse.json(
      { success: false, error: "Error al crear consulta ciudadana" },
      { status: 500 }
    );
  }
}