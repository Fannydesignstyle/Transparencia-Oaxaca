import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const consultationId = searchParams.get("consultationId");
    const userId = searchParams.get("userId");

    // Construir la consulta base
    let whereClause: any = {};
    
    if (consultationId) {
      whereClause.consultationId = consultationId;
    }
    
    if (userId) {
      whereClause.userId = userId;
    }

    // Obtener votos
    const votes = await db.vote.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
      include: {
        consultation: {
          select: {
            id: true,
            title: true,
            institution: {
              select: {
                id: true,
                name: true,
              },
            },
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
      data: votes,
    });
  } catch (error) {
    console.error("Error fetching votes:", error);
    return NextResponse.json(
      { success: false, error: "Error al obtener votos" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { consultationId, option, userId } = body;

    // Validar campos requeridos
    if (!consultationId || !option) {
      return NextResponse.json(
        { success: false, error: "Consulta y opción son requeridos" },
        { status: 400 }
      );
    }

    // Verificar que la consulta existe y está activa
    const consultation = await db.consultation.findUnique({
      where: { id: consultationId },
    });

    if (!consultation) {
      return NextResponse.json(
        { success: false, error: "Consulta no encontrada" },
        { status: 404 }
      );
    }

    // Verificar que la consulta está activa
    const now = new Date();
    if (now < consultation.startDate || now > consultation.endDate) {
      return NextResponse.json(
        { success: false, error: "La consulta no está activa" },
        { status: 400 }
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

      // Verificar que el usuario no haya votado ya en esta consulta
      const existingVote = await db.vote.findUnique({
        where: {
          userId_consultationId: {
            userId,
            consultationId,
          },
        },
      });

      if (existingVote) {
        return NextResponse.json(
          { success: false, error: "Ya has votado en esta consulta" },
          { status: 400 }
        );
      }
    }

    // Crear voto
    const vote = await db.vote.create({
      data: {
        consultationId,
        option,
        userId,
      },
      include: {
        consultation: {
          select: {
            id: true,
            title: true,
            institution: {
              select: {
                id: true,
                name: true,
              },
            },
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
      data: vote,
    });
  } catch (error) {
    console.error("Error creating vote:", error);
    return NextResponse.json(
      { success: false, error: "Error al registrar voto" },
      { status: 500 }
    );
  }
}