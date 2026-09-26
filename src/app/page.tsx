import React, { Suspense } from 'react';
import Hero from "./components/Hero";
import Library from "./components/Library";

function LibrarySkeleton() {
  return (
    <section className="mt-10.5 pb-10">
      <div className="mb-5">
        <h2 className="font-[var(--font-roboto-condensed)] text-[24px] font-black uppercase leading-none tracking-[-0.6px] text-[#f5f5f5]">
          THE LIBRARY
        </h2>
        <p className="mt-1.5 text-[10px] leading-none text-[#777d88]">
          Loading workouts library…
        </p>
      </div>

      {/* Animated Loading Header Banner */}
      <div className="flex flex-col items-center justify-center py-10 my-4 rounded-xl border border-[#292c33] bg-[#15171c]">
        <div className="relative flex h-14 w-14 items-center justify-center">
          <div className="absolute h-14 w-14 animate-spin rounded-full border-4 border-[#292c33] border-t-[#baff00]" />
          <div className="h-5 w-5 rounded-full bg-[#baff00] opacity-80 animate-ping" />
        </div>
        <p className="mt-4 text-[12px] font-bold uppercase tracking-[1.5px] text-[#baff00] animate-pulse">
          Loading exercise data…
        </p>
      </div>

      {/* Skeleton Card Grid */}
      <div className="grid grid-cols-3 gap-x-4 gap-y-4 max-lg:grid-cols-2 max-sm:grid-cols-1">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="animate-pulse overflow-hidden rounded-[10px] border border-[#292c33] bg-[#15171c]"
          >
            <div className="h-47.5 w-full bg-[#1b1e24]" />
            <div className="p-4 space-y-3">
              <div className="flex gap-2">
                <div className="h-3.5 w-12 rounded bg-[#262a33]" />
                <div className="h-3.5 w-16 rounded bg-[#262a33]" />
              </div>
              <div className="h-4 w-3/4 rounded bg-[#262a33]" />
              <div className="h-3 w-1/2 rounded bg-[#20242b]" />
              <div className="h-px bg-[#22252b] my-2" />
              <div className="flex justify-between">
                <div className="h-3 w-16 rounded bg-[#20242b]" />
                <div className="h-3 w-16 rounded bg-[#20242b]" />
                <div className="h-3 w-12 rounded bg-[#20242b]" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const HomePage = () => {
  return (
    <div>
      <Hero />
      <Suspense fallback={<LibrarySkeleton />}>
        <Library />
      </Suspense>
    </div>
  );
};

export default HomePage;