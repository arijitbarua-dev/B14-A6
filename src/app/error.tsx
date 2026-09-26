"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("APPLICATION ERROR:", error);
  }, [error]);

  return (
    <main className="flex min-h-[75vh] flex-col items-center justify-center bg-[#0d0f12] px-5 py-16 text-center text-white">
      <div className="mx-auto max-w-md">
        {/* Error Badge */}
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-red-900/40 bg-red-950/20 text-[24px] font-black text-red-500">
          ⚠️
        </div>

        {/* Heading */}
        <h1 className="text-[24px] font-black uppercase tracking-[-0.5px] sm:text-[28px]">
          Something went wrong
        </h1>

        {/* Description */}
        <p className="mt-3 text-[13px] leading-[1.6] text-[#858b95]">
          An unexpected error occurred while loading this page. Please try reloading or return to the main workouts library.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex h-10 items-center justify-center rounded-lg bg-[#baff00] px-5 text-[11px] font-black uppercase tracking-[0.5px] text-[#080900] transition hover:bg-[#c8ff33]"
          >
            Try Again
          </button>

          <Link
            href="/"
            className="inline-flex h-10 items-center justify-center rounded-lg border border-[#292c33] bg-[#15171c] px-5 text-[11px] font-bold uppercase tracking-[0.5px] text-[#c3c6cb] transition hover:border-[#59606b] hover:text-white"
          >
            Go Home
          </Link>
        </div>
      </div>
    </main>
  );
}
