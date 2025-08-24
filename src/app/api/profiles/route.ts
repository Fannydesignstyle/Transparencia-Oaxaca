import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const institutionId = searchParams.get("institutionId");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const category = searchParams.get("category") || "";

    const skip = (page - 1) * limit;

    // Construir la consulta base
    let whereClause: any = { isPublic: true };
    
    if (institutionId) {
      whereClause.institutionId = institutionId;
    }
    
    if (category) {
      whereClause.category = category;
    }

    // Obtener perfiles institucionales
    const profiles = await db.institutionalProfile.findMany({
      where: whereClause,
      skip,
      take: limit,
      orderBy: { publishDate: "desc" },
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

    // Obtener total de perfiles para paginación
    const total = await db.institutionalProfile.count({ where: whereClause });

    return NextResponse.json({
      success: true,
      data: profiles,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching profiles:", error);
    return NextResponse.json(
      { success: false, error: "Error al obtener perfiles institucionales" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { institutionId, title, content, category } = body;

    // Validar campos requeridos
    if (!institutionId || !title || !content || !category) {
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

    // Crear perfil institucional
    const profile = await db.institutionalProfile.create({
      data: {
        institutionId,
        title,
        content,
        category,
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
      data: profile,
    });
  } catch (error) {
    console.error("Error creating profile:", error);
    return NextResponse.json(
      { success: false, error: "Error al crear perfil institucional" },
      { status: 500 }
    );
  }
}