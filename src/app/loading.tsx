import React from "react";

export default function Loading() {
  return (
    <main className="min-h-screen bg-[#0d0f12] px-5 py-9.5 text-white">
      <div className="mx-auto max-w-300">
        {/* Animated Loading Header Banner */}
        <div className="flex flex-col items-center justify-center py-20">
          <div className="relative flex h-16 w-16 items-center justify-center">
            {/* Outer Spinning Accent Ring */}
            <div className="absolute h-16 w-16 animate-spin rounded-full border-4 border-[#292c33] border-t-[#baff00]" />
            {/* Inner Glowing Core */}
            <div className="h-6 w-6 rounded-full bg-[#baff00] opacity-80 animate-ping" />
          </div>
          <p className="mt-6 text-[13px] font-bold uppercase tracking-[1.5px] text-[#baff00] animate-pulse">
            Loading workouts…
          </p>
        </div>

        {/* Skeleton Grid for Exercise Cards */}
        <div className="mt-8 grid grid-cols-3 gap-4 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="animate-pulse overflow-hidden rounded-[10px] border border-[#292c33] bg-[#15171c]"
            >
              {/* Image Skeleton */}
              <div className="h-47.5 w-full bg-[#1b1e24]" />
              {/* Content Skeleton */}
              <div className="p-4 space-y-3">
                <div className="flex gap-2">
                  <div className="h-4 w-12 rounded bg-[#262a33]" />
                  <div className="h-4 w-16 rounded bg-[#262a33]" />
                </div>
                <div className="h-5 w-3/4 rounded bg-[#262a33]" />
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
      </div>
    </main>
  );
}
