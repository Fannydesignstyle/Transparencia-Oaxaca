import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";
    const type = searchParams.get("type") || "";

    const skip = (page - 1) * limit;

    // Construir la consulta base
    let whereClause: any = {};
    
    if (search) {
      whereClause.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }
    
    if (type) {
      whereClause.type = type;
    }

    // Obtener instituciones
    const institutions = await db.institution.findMany({
      where: whereClause,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: {
            profiles: true,
            documents: true,
            qrCodes: true,
          },
        },
      },
    });

    // Obtener total de instituciones para paginación
    const total = await db.institution.count({ where: whereClause });

    return NextResponse.json({
      success: true,
      data: institutions,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching institutions:", error);
    return NextResponse.json(
      { success: false, error: "Error al obtener instituciones" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, type, address, phone, email, website } = body;

    // Validar campos requeridos
    if (!name || !type) {
      return NextResponse.json(
        { success: false, error: "Nombre y tipo son requeridos" },
        { status: 400 }
      );
    }

    // Crear institución
    const institution = await db.institution.create({
      data: {
        name,
        description,
        type,
        address,
        phone,
        email,
        website,
      },
    });

    return NextResponse.json({
      success: true,
      data: institution,
    });
  } catch (error) {
    console.error("Error creating institution:", error);
    return NextResponse.json(
      { success: false, error: "Error al crear institución" },
      { status: 500 }
    );
  }
}