// app/api/your-endpoint/route.ts

import { sendJobToQueue } from "@/lib/helper/sendJobToQueue";
import { prisma } from "@/lib/prismaClient";
import { JobStatus, Prisma } from "@prisma/client";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();

    const { url } = body;
    if (!url) {
      return new Response(JSON.stringify({ error: "Please enter a job URL" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const existingJob = await prisma.job.findFirst({
      where: { url: "https://www.doddlehq.com/" },
    });

    if (existingJob) {
      return new Response(JSON.stringify({ error: "Job already exists" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const newJob = await prisma.job.create({
      data: {
        url,
        status: JobStatus.Active,
      },
    });

    if (newJob) {
      sendJobToQueue(newJob).catch((error) => {
        console.error("Failed to send job to queue:", error);
      });

      return new Response(
        JSON.stringify({ message: "Job created successfully" }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } catch (error) {
    if (error instanceof Error) {
      return new Response(
        JSON.stringify({
          error: "Invalid JSON or request",
          message: error.message,
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  }
};

export const GET = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query") || "";

    const whereClause: Prisma.JobWhereInput = {};
    if (query) {
      Object.assign(whereClause, {
        OR: [
          { id: query },
          { salary: query },
          { title: { contains: query } },
          { category: { contains: query } },
          { type: { contains: query } },
          { location: { contains: query } },
          { descriptionHTML: { contains: query } },
          { descriptionText: { contains: query } },
        ],
      });
    }

    const jobs = await prisma.job.findFirst({
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

export const PATCH = async (req: Request) => {
  const body = await req.json();

  const { id, data } = body;

  const allowedFields = [
    "url",
    "title",
    "category",
    "type",
    "location",
    "salary",
    "descriptionHTML",
    "descriptionText",
    "status",
  ];

  if (!id || typeof data !== "object") {
    return new Response(JSON.stringify({ error: "Invalid request body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Filter out invalid keys
  const sanitizedData: Record<string, any> = {};
  for (const key of Object.keys(data)) {
    if (allowedFields.includes(key)) {
      sanitizedData[key] = (data[key] as string).toLowerCase();
    }
  }

  try {
    const updatedJob = await prisma.job.update({
      where: { id },
      data: sanitizedData,
    });

    return new Response(JSON.stringify(updatedJob), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Update failed:", error);
    return new Response(JSON.stringify({ error: "Failed to update job" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
