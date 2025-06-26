"use client";

import { motion } from "motion/react";
import { Highlight } from "@/components/ui/hero-highlight";
import React, { useReducer } from "react";

const initialState = {
  title: "",
  company: "",
  location: "",
  job_type: "",
  experience: "",
  salary: "",
  description: "",
};

const reducer = (
  state: typeof initialState,
  action: { type: string; payload: string }
) => {
  switch (action.type) {
    case "UPDATE_TITLE":
      return { ...state, title: action.payload };
    case "UPDATE_COMPANY":
      return { ...state, company: action.payload };
    case "UPDATE_LOCATION":
      return { ...state, location: action.payload };
    case "UPDATE_JOB_TYPE":
      return { ...state, job_type: action.payload };
    case "UPDATE_EXPERIENCE":
      return {
        ...state,
        experience: action.payload.replace(/[a-zA-Z]/g, ""),
      };
    case "UPDATE_SALARY":
      return { ...state, salary: action.payload.replace(/[a-zA-Z]/g, "") };
    case "UPDATE_JOB_DESCRIPTION":
      return { ...state, description: action.payload };
    case "RESET":
      return { ...initialState };
    default:
      throw new Error();
  }
};

const AddJobPage = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [submitting, setSubmitting] = React.useState(false);

  type InputType = React.ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >;

  const handleChange = (e: InputType) => {
    dispatch({
      type: `UPDATE_${e.target.id.toUpperCase()}`,
      payload: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isEmpty = Object.entries(state).some(([, value]) => !value);

    if (isEmpty) {
      alert("Please fill all the fields");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/job", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(state),
      });

      const data = await res.json();
      if (data.message === "Job created successfully") {
        dispatch({
          type: "RESET",
          payload: "",
        });
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
    <div className="mx-auto min-h-[calc(100vh-64px)] max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col gap-8 items-center justify-center text-black">
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
        className="text-3xl px-4 font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto"
      >
        Create a Job Opening <br />
        <Highlight className="text-black dark:text-white">
          &quot;By Hiring the Best Talent&quot;
        </Highlight>
      </motion.h1>

      <form
        className="grid grid-cols-2 bg-amber-100 rounded-xl shadow-amber-50 shadow-md"
        onSubmit={handleSubmit}
      >
        <div className=" px-4 py-6">
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
            <label
              htmlFor="title"
              className="block text-xl font-semibold text-gray-900"
            >
              Job Title
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <input
                type="text"
                id="title"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="e.g. Software Engineer"
                value={state.title}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className=" px-4 py-6">
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
            <label
              htmlFor="company"
              className="block text-xl font-semibold text-gray-900"
            >
              Company
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <input
                type="text"
                id="company"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="e.g. Apple"
                value={state.company}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className=" px-4 py-6">
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
            <label
              htmlFor="location"
              className="block text-xl font-semibold text-gray-900"
            >
              Location
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <input
                type="text"
                id="location"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="e.g. San Francisco, CA"
                value={state.location}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className=" px-4 py-6">
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
            <label
              htmlFor="job_type"
              className="block text-xl font-semibold text-gray-900"
            >
              Job Type
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <select
                id="job_type"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={state.job_type}
                onChange={handleChange}
              >
                <option value="" defaultChecked>
                  Choose a job type
                </option>
                <option value="full_time">Full-time</option>
                <option value="part_time">Part-time</option>
                <option value="remote">Remote</option>
                <option value="intership">Internship</option>
                <option value="contract">Contract</option>
              </select>
            </div>
          </div>
        </div>
        <div className=" px-4 py-6">
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
            <label
              htmlFor="experience"
              className="block text-xl font-semibold text-gray-900"
            >
              Experience
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <input
                type="number"
                id="experience"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="e.g. 3+ years"
                value={state.experience}
                onChange={handleChange}
                inputMode="numeric"
                pattern="[0-9]*"
                title="Only numbers are allowed"
              />
            </div>
          </div>
        </div>
        <div className=" px-4 py-6">
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
            <label
              htmlFor="salary"
              className="block text-xl font-semibold text-gray-900"
            >
              Salary
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <input
                type="number"
                id="salary"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="e.g. $100,000"
                value={state.salary}
                onChange={handleChange}
                inputMode="numeric"
                pattern="[0-9]*"
                title="Only numbers are allowed"
              />
            </div>
          </div>
        </div>
        <div className=" px-4 py-6">
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
            <label
              htmlFor="description"
              className="block text-xl font-semibold text-gray-900"
            >
              Job Description
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <textarea
                id="job_description"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="e.g. We are looking for a software engineer to join our team..."
                value={state.description}
                onChange={handleChange}
                rows={3}
              />
            </div>
          </div>
        </div>

        <div className="col-span-2 w-full flex items-center justify-center">
          <button
            type="submit"
            disabled={submitting}
            className={
              submitting
                ? "cursor-not-allowed flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600"
                : "cursor-pointer flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            }
          >
            Post Job
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddJobPage;
