"use client";

import { JobStatus } from "@prisma/client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import parse from "html-react-parser";
import DOMPurify from "dompurify";

interface Job {
  id: string;
  title?: string;
  category?: string;
  location?: string;
  type?: string;
  salary?: string;
  descriptionHTML?: string;
  descriptionText?: string;
  status: string;
  url: string;
}

const JobPage = () => {
  const { slug } = useParams();

  const [job, setJob] = useState<Job | null>(null);
  const [status, setStatus] = useState("Active");

  useEffect(() => {
    const fetchJob = async () => {
      const res = await fetch(`/api/job?query=${slug}`);
      const data = await res.json();
      setJob(data);
      setStatus(data.status);
    };
    fetchJob();
  }, [slug]);

  if (!job) {
    return (
      <div className="text-center py-20 text-xl font-semibold">
        Job not found
      </div>
    );
  }

  const handleUpdateStatus = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const res = await fetch(`/api/job`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: job.id,
        data: {
          status: status,
        },
      }),
    });

    const updatedJob = await res.json();
    setJob(updatedJob);
  };

  const sanitizedJobDescHTML = DOMPurify.sanitize(job?.descriptionHTML || "");

  return (
    <main className="min-h-[calc(100vh-64px)] overflow-hidden bg-gray-50 dark:bg-gray-900 p-8 md:p-16">
      <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 md:flex gap-10">
        {/* Main Content */}
        <section className="flex-1">
          <h1 className="text-4xl font-extrabold mb-4 text-gray-900 dark:text-white capitalize">
            {job?.title}
          </h1>

          {job?.category && (
            <div className="flex items-center gap-4 text-gray-700 dark:text-gray-300 mb-8">
              <span className="text-lg font-semibold capitalize">
                Category: {job?.category}
              </span>
            </div>
          )}
          {job?.location && (
            <div className="flex items-center gap-4 text-gray-700 dark:text-gray-300 mb-8">
              <span className="text-lg font-semibold capitalize">
                Location: {job?.location}
              </span>
            </div>
          )}

          <div className="text-gray-800 dark:text-gray-200 space-y-6 leading-relaxed">
            {job?.type && (
              <p>
                <strong>Job Type:</strong> {job?.type?.replace("_", " ")}
              </p>
            )}

            {job?.salary && (
              <p>
                <strong>Salary:</strong> {job?.salary}
              </p>
            )}
            {job?.url && (
              <p>
                <strong>Job Url:</strong> {job?.url}
              </p>
            )}
            {job?.descriptionHTML && (
              <div className=".awsm-job-container">
                {parse(sanitizedJobDescHTML || "")}
              </div>
            )}
            {job?.descriptionText && (
              <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
                {job?.descriptionText}
              </pre>
            )}
          </div>
        </section>

        {/* Sidebar */}
        <aside className="w-full h-fit max-w-xs mt-10 md:mt-0 border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-gray-50 dark:bg-gray-900 flex flex-col gap-6">
          <div>
            <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
              Job Details
            </h2>
            <ul className="text-gray-700 dark:text-gray-300 space-y-2">
              {job?.category && (
                <li>
                  <strong>Category: </strong> {job?.category}
                </li>
              )}
              {job?.location && (
                <li>
                  <strong>Location:</strong> {job?.location}
                </li>
              )}
              {job?.type && (
                <li>
                  <strong>Job Type:</strong> {job?.type?.replace("_", " ")}
                </li>
              )}

              {job?.salary && (
                <li>
                  <strong>Salary:</strong> {job?.salary}
                </li>
              )}
              {job?.url && (
                <li className="break-all">
                  <strong>Job Url:</strong> {job?.url}
                </li>
              )}
            </ul>
          </div>

          <div className="w-full">
            <label
              htmlFor="job-status"
              className="block text-sm font-medium text-gray-900 dark:text-white mb-2"
            >
              Job Status
            </label>
            <select
              id="job-status"
              name="job-status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            >
              {Object.values(JobStatus).map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            disabled={job.status === status}
            onClick={handleUpdateStatus}
            className={`w-full ${
              job.status === status
                ? "bg-gray-300 dark:bg-gray-700"
                : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
            } transition text-white font-semibold py-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
          >
            Apply Changes
          </button>
        </aside>
      </div>
    </main>
  );
};

export default JobPage;
