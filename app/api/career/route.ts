import { prisma } from "@/lib/prismaClient";
import { JobStatus } from "@prisma/client";

export const GET = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const key = searchParams.get("key") || "";
    const value = searchParams.get("value") || "";

    if (!key || !value) {
      return new Response(JSON.stringify({ error: "Invalid request" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const whereClause: Record<string, any> = {};

    whereClause[key] = {
      contains: value,
    };
    whereClause["status"] = JobStatus.Active;

    const jobs = await prisma.job.findMany({
      where: whereClause,
    });

    return new Response(JSON.stringify(jobs), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("GET /api error:", error);
    return new Response(
      JSON.stringify({
        error: "Invalid request",
        message: error instanceof Error ? error.message : String(error),
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
