import { Job } from "@prisma/client";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });
export const sendJobToQueue = async (job: Job) => {
  const WORKFLOW_BACKEND_URL =
    process.env.NODE_ENV === "production"
      ? process.env.WORKFLOW_BACKEND_PROD_URL
      : process.env.WORKFLOW_BACKEND_DEV_URL;

  await fetch(`${WORKFLOW_BACKEND_URL}/webhook/newjob`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: job.id, url: job.url }),
  });
};