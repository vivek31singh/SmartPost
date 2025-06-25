"use client";

import { useScroll } from "@/lib/hooks/useScroll";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export const Header = () => {
  const isVisible = useScroll();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const pathName = usePathname();

  const paths = [
    { title: "create job opening", link: "/create-job" },
    { title: "All Job Openings", link: "/jobs" },
  ];

  return (
    <nav
      className={`fixed w-full top-0 left-0 z-50  border-b bg-black border-gray-200 dark:border-gray-700 transition-transform duration-300 ease-in-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex items-center">
          <Link href={"/"}>
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              SmartPost
            </span>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-4 space-x-8">
          {paths.map(({ title, link }) => (
            <Link
              href={link}
              key={link}
              className={`text-gray-600 dark:text-gray-400 hover:underline capitalize ${
                pathName === link ? "underline" : ""
              }`}
            >
              {title}
            </Link>
          ))}
        </div>

        <div className="md:hidden flex items-center">
          <button
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            {isMobileMenuOpen ? (
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

       
      </div>
       <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden`}
          id="mobile-menu"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {paths.map(({ title, link }) => (
              <Link
                href={link}
                key={link}
                className={`text-gray-600 dark:text-gray-400 hover:underline ${
                  pathName === link ? "underline" : ""
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {title}
              </Link>
            ))}
          </div>
        </div>
    </nav>
  );
};
