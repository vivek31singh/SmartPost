import { prisma } from "@/lib/prismaClient";
import Link from "next/link";
import React from "react";

export const dynamic = "force-dynamic";

const JobsPage = async () => {
  const jobs = await prisma.job?.findMany({
    select: {
      id: true,
      url: true,
      title: true,
      category: true,
      type: true,
      location: true,
      salary: true,
      status: true,
    },
  });

  return (
    <main className="min-h-[calc(100vh-64px)] w-full p-10 bg-gray-50 dark:bg-gray-900">
      <h1 className="text-4xl font-extrabold text-center text-gray-900 dark:text-white max-w-4xl mx-auto mb-12">
        {jobs.length > 0
          ? "Explore Our Current Job Openings"
          : "We don't currently have any job openings. Please consider creating one."}
      </h1>

      <div className="max-w-7xl mx-auto grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <Link
            href={`/jobs/${job?.id}`}
            key={job?.id}
            className="group block rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm hover:shadow-lg transition-shadow duration-300"
          >
            {job?.title && (
              <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white capitalize group-hover:text-blue-600">
                {job?.title}
              </h2>
            )}
            {job?.category && (
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-1 capitalize">
                <strong>Category:</strong> {job?.category}
              </p>
            )}
            {job?.type && (
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-1 capitalize">
                <strong>Job Type:</strong> {job?.type?.replace("_", " ")}
              </p>
            )}
            {job?.salary && (
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">
                <strong>Salary:</strong> {job?.salary}
              </p>
            )}
            {job?.location && (
              <p className="text-sm text-gray-700 dark:text-gray-300 capitalize mb-1">
                <strong>Location:</strong> {job?.location}
              </p>
            )}
            {job?.status && (
              <p className="text-sm text-gray-700 dark:text-gray-300 capitalize mb-1">
                <strong>Status:</strong> {job?.status}
              </p>
            )}
            {job?.url && (
              <p className="text-sm  text-gray-700 dark:text-gray-300 capitalize">
                <strong>Job Url: </strong>
                {job?.url}
              </p>
            )}
          </Link>
        ))}
      </div>
    </main>
  );
};

export default JobsPage;
