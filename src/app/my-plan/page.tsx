"use client";

import React, { useState } from "react";
import Link from "next/link";

type Tab = "today" | "saved";
type SortOption = "duration" | "calories" | "rating";

const MyPlanPage = () => {
  const [activeTab, setActiveTab] = useState<Tab>("saved");
  const [sortBy, setSortBy] = useState<SortOption>("duration");

  return (
    <main className="min-h-screen w-full bg-[#0d0f12] text-white">
      <div className="w-full px-5 py-9.5 sm:px-8 lg:px-10 xl:px-12">

        {/* HEADER */}
        <section className="w-full">
          <h1 className="m-0 text-[23px] font-black uppercase leading-5.75 tracking-[-0.5px]">
            My Plan
          </h1>

          <p className="m-0 mt-2.25 text-[12px] leading-3 text-[#858b95]">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </section>

        {/* STATS CARD */}
        <section className="mt-5.25 w-full overflow-hidden rounded-[13px] border border-[#272c34] bg-[#15181e]">
          <div className="grid w-full grid-cols-3">

            {/* Exercises */}
            <div className="px-5.25 py-6.75">
              <p className="m-0 text-[10px] leading-2.5 text-[#858b95]">
                Exercises
              </p>

              <p className="m-0 mt-1.75 text-[34px] font-black leading-8.5 text-[#c8ff00]">
                0
              </p>
            </div>

            {/* Minutes */}
            <div className="border-l border-[#292e36] px-6.75 py-6.75">
              <p className="m-0 text-[10px] leading-2.5 text-[#858b95]">
                Minutes
              </p>

              <p className="m-0 mt-1.75 text-[34px] font-black leading-8.5 text-white">
                0
              </p>
            </div>

            {/* Calories */}
            <div className="border-l border-[#292e36] px-6.75 py-6.75">
              <p className="m-0 text-[10px] leading-2.5 text-[#858b95]">
                Calories
              </p>

              <p className="m-0 mt-1.75 text-[34px] font-black leading-8.5 text-white">
                0
              </p>
            </div>

          </div>
        </section>

        {/* CONTROLS */}
        <section className="mt-6.75 flex w-full items-center justify-between">

          {/* Tabs */}
          <div className="flex h-8.5 shrink-0 items-center rounded-[9px] border border-[#252a32] bg-[#15181e] p-0.75">

            <button
              type="button"
              onClick={() => setActiveTab("today")}
              className={`flex h-6.5 items-center rounded-md px-3.75 text-[10px] leading-2.5 transition ${
                activeTab === "today"
                  ? "bg-[#20252d] font-semibold text-white shadow-sm"
                  : "font-medium text-[#858b95] hover:text-white"
              }`}>
              Today&apos;s Plan
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("saved")}
              className={`flex h-6.5 items-center rounded-md px-4.25 text-[10px] leading-2.5 transition ${
                activeTab === "saved"
                  ? "bg-[#20252d] font-semibold text-white shadow-sm"
                  : "font-medium text-[#858b95] hover:text-white"
              }`}>
              Saved
            </button>

          </div>

          {/* Sort By */}

          <div className="flex h-7.5 items-center gap-1.75">

            <span className="text-[10px] leading-2.5 text-[#858b95]">
              Sort By
            </span>

            <div className="relative">

              <select
                value={sortBy}
                onChange={(event) =>
                  setSortBy(
                    event.target.value as SortOption
                  )
                }
                className="h-7.5 w-24 cursor-pointer appearance-none rounded-lg border border-[#272c34] bg-[#15181e] px-2.75 pr-7 text-[10px] leading-2.5 text-[#d0d3d8] outline-none transition hover:border-[#3a4049] focus:border-[#3a4049]">
                <option value="duration">
                  Duration
                </option>

                <option value="calories">
                  Calories
                </option>

                <option value="rating">
                  Rating
                </option>
              </select>

              <span className="pointer-events-none absolute right-2.25 top-1/2 -translate-y-1/2 text-[#858b95]">
                <ChevronDownIcon />
              </span>

            </div>

          </div>

        </section>

        {/* EMPTY STATE */}
        <section className="mt-5 flex h-64 w-full flex-col items-center justify-center rounded-[11px] border border-dashed border-[#242932]">

          <h2 className="m-0 text-[17px] font-black uppercase leading-4.25 tracking-[-0.2px]">
            Nothing Here Yet
          </h2>

          <p className="m-0 mt-2.25 text-center text-[11px] leading-2.75 text-[#858b95]">
            Browse the library and add a lift to get today moving.
          </p>

          <Link
            href="/"
            className="mt-4.75 flex h-8 items-center justify-center rounded-full bg-[#c8ff00] px-5 text-[10px] font-bold leading-2.5 text-black shadow-[0_5px_18px_rgba(200,255,0,0.15)] transition hover:bg-[#d5ff3d]">
            Go to workouts
          </Link>

        </section>

      </div>
    </main>
  );
};


// CHEVRON ICON
function ChevronDownIcon() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export default MyPlanPage;