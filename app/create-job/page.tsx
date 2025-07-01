"use client";

import { Highlight } from "@/components/ui/hero-highlight";
import { motion } from "motion/react";
import React, { useState } from "react";

const AddJobPage = () => {
  const [url, setUrl] = useState("");
  const [submitting, setSubmitting] = React.useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!url) {
      alert("Please enter a job URL");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/job", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();
      if (data.message === "Job created successfully") {
        setUrl("");
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error(err);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto min-h-[calc(100vh-64px)] max-w-4xl px-4 sm:px-6 lg:px-8 flex flex-col gap-6 items-center justify-center text-black">
      <motion.h1
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: [20, -5, 0],
        }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        className="text-4xl font-extrabold text-gray-900 dark:text-white text-center mb-4"
      >
        Submit a <Highlight>Job URL</Highlight>
      </motion.h1>

      <form
        className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8"
        onSubmit={handleSubmit}
      >
        <div className="mb-6">
          <label
            htmlFor="url"
            className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Job URL
          </label>
          <input
            type="url"
            id="url"
            className="block w-full px-4 py-3 border placeholder:text-gray-500 text-white border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="https://example.com/job/software-engineer"
            value={url}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className={`w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
            submitting
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          }`}
        >
          {submitting ? "Submitting URL..." : "Submit URL"}
        </button>
      </form>
    </div>
  );
};

export default AddJobPage;
