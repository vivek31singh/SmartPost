// app/api/your-endpoint/route.ts

import { prisma } from "@/lib/prismaClient";
import { JobStatus } from "@prisma/client";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();

    const {
      title,
      company,
      location,
      job_type,
      experience,
      salary,
      description,
    } = body;

    if (
      !title ||
      !company ||
      !location ||
      !job_type ||
      !experience ||
      !salary ||
      !description
    ) {
      return new Response(
        JSON.stringify({ error: "Please fill all the fields" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const newJob = await prisma.job.create({
      data: {
        title,
        company,
        location,
        job_type,
        experience,
        salary,
        description,
        status: JobStatus.Active,
      },
    });

    return new Response(
      JSON.stringify({ message: "Job created successfully", job: newJob }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    if(error instanceof Error){
      return new Response(JSON.stringify({ error: "Invalid JSON or request", message: error.message }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
  }
};

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query") || "";

  const jobs = await prisma.job.findFirst({
    where: {
      OR: [
        { id: { contains: query } },
        { title: { contains: query } },
        { description: { contains: query } },
      ],
    },
  });

  return new Response(JSON.stringify(jobs), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};

export const PATCH = async (req: Request) => {
  const body = await req.json();
  const { id, key, value } = body;
  console.log(body);
  const updatedJob = await prisma.job.update({
    where: {
      id: id,
    },
    data: {
      [key]: value,
    },
  });
  return new Response(JSON.stringify(updatedJob), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
