"use client";
import { motion } from "motion/react";

import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import Link from "next/link";

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <HeroHighlight className="h-screen flex flex-col gap-8 justify-center items-center">
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
          className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto "
        >
          Hire the Best Talent for Your Business{" "}
          <Highlight className="text-black dark:text-white">
            &quot;Expand with top talent!&quot;
          </Highlight>
        </motion.h1>

        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
          <Link href={"/create-job"} className="flex items-center justify-center w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm capitalize cursor-pointer">
            create job opening
          </Link>
          <Link href={"/jobs"} className="flex items-center justify-center w-40 h-10 rounded-xl bg-white text-black border border-black  text-sm capitalize cursor-pointer">
            all jobs
          </Link>
        </div>
      </HeroHighlight>
    </div>
  );
}
