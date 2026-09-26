"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Workout = {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: string;
  duration: number;
  caloriesBurned: number;
  sets: number;
  reps: string;
  rating: number;
  description: string;
  instructions: string[];
};

const API_URL = "https://api.abcz.workers.dev/api/fitlog";

const PLAN_KEY = "fitlog-plan";
const SAVED_KEY = "fitlog-saved";

type SortOption =
  | "Duration"
  | "Calories"
  | "Rating";

export default function MyPlanPage() {
  const [workouts, setWorkouts] =
    useState<Workout[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [activeTab, setActiveTab] =
    useState<"plan" | "saved">("plan");

  const [sortBy, setSortBy] =
    useState<SortOption>("Duration");

  const [showSort, setShowSort] =
    useState(false);

  const [planIds, setPlanIds] =
    useState<number[]>([]);

  const [savedIds, setSavedIds] =
    useState<number[]>([]);

  /* =========================================================
     LOCAL STORAGE
  ========================================================= */

  const readStorage = () => {
    try {
      const storedPlan = localStorage.getItem(PLAN_KEY);

      const storedSaved = localStorage.getItem(SAVED_KEY);

      const parsedPlan = storedPlan ? JSON.parse(storedPlan) : [];

      const parsedSaved = storedSaved ? JSON.parse(storedSaved) : [];

      setPlanIds(Array.isArray(parsedPlan) ? parsedPlan.map(Number) : []);

      setSavedIds(Array.isArray(parsedSaved) ? parsedSaved.map(Number) : []);
    } catch (error) {
      console.error(
        "LOCAL STORAGE ERROR:",
        error
      );

      setPlanIds([]);
      setSavedIds([]);
    }
  };

  /* =========================================================
     FETCH WORKOUTS
  ========================================================= */

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        setLoading(true);

        const response =
          await fetch(
            API_URL
          );

        if (!response.ok) {
          throw new Error(
            `Failed with status: ${response.status}`
          );
        }

        const data: Workout[] =
          await response.json();

        setWorkouts(data);
      } catch (error) {
        console.error(
          "FETCH ERROR:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadWorkouts();
  }, []);

  /* =========================================================
     STORAGE EVENTS
  ========================================================= */

  useEffect(() => {
    readStorage();

    const handleStorageUpdate =
      () => {
        readStorage();
      };

    window.addEventListener(
      "fitlog-storage-update",
      handleStorageUpdate
    );

    window.addEventListener(
      "storage",
      handleStorageUpdate
    );

    return () => {
      window.removeEventListener(
        "fitlog-storage-update",
        handleStorageUpdate
      );

      window.removeEventListener(
        "storage",
        handleStorageUpdate
      );
    };
  }, []);

  /* =========================================================
     SORTED WORKOUT LIST
     
     IMPORTANT:
     Duration  = lowest → highest
     Calories  = lowest → highest
     Rating    = lowest → highest
  ========================================================= */

  const currentWorkouts =
    useMemo(() => {
      const ids =
        activeTab === "plan"
          ? planIds
          : savedIds;

      const filtered =
        workouts.filter(
          (workout) =>
            ids.includes(
              Number(
                workout.id
              )
            )
        );

      return [...filtered].sort(
        (a, b) => {
          if (
            sortBy ===
            "Duration"
          ) {
            return (
              Number(
                a.duration
              ) -
              Number(
                b.duration
              )
            );
          }

          if (
            sortBy ===
            "Calories"
          ) {
            return (
              Number(
                a.caloriesBurned
              ) -
              Number(
                b.caloriesBurned
              )
            );
          }

          if (
            sortBy ===
            "Rating"
          ) {
            return (
              Number(a.rating) -
              Number(b.rating)
            );
          }

          return 0;
        }
      );
    }, [
      workouts,
      planIds,
      savedIds,
      activeTab,
      sortBy,
    ]);

  /* =========================================================
     REMOVE FROM PLAN
  ========================================================= */

  const removeFromPlan = (
    id: number
  ) => {
    const updatedPlan =
      planIds.filter(
        (workoutId) =>
          workoutId !== id
      );

    localStorage.setItem(
      PLAN_KEY,
      JSON.stringify(
        updatedPlan
      )
    );

    setPlanIds(updatedPlan);

    window.dispatchEvent(
      new Event(
        "fitlog-storage-update"
      )
    );
  };

  /* =========================================================
     REMOVE FROM SAVED
  ========================================================= */

  const removeFromSaved = (
    id: number
  ) => {
    const updatedSaved =
      savedIds.filter(
        (workoutId) =>
          workoutId !== id
      );

    localStorage.setItem(
      SAVED_KEY,
      JSON.stringify(
        updatedSaved
      )
    );

    setSavedIds(updatedSaved);

    window.dispatchEvent(
      new Event(
        "fitlog-storage-update"
      )
    );
  };

  /* =========================================================
     MARK AS DONE
  ========================================================= */

  const markAsDone = (
    id: number
  ) => {
    const updatedPlan =
      planIds.filter(
        (workoutId) =>
          workoutId !== id
      );

    localStorage.setItem(
      PLAN_KEY,
      JSON.stringify(
        updatedPlan
      )
    );

    setPlanIds(updatedPlan);

    window.dispatchEvent(
      new Event(
        "fitlog-storage-update"
      )
    );
  };

  /* =========================================================
     STATS
  ========================================================= */

  const planWorkouts =
    workouts.filter((workout) =>
      planIds.includes(
        Number(workout.id)
      )
    );

  const totalExercises =
    planWorkouts.length;

  const totalMinutes =
    planWorkouts.reduce(
      (total, workout) =>
        total +
        Number(
          workout.duration
        ),
      0
    );

  const totalCalories =
    planWorkouts.reduce(
      (total, workout) =>
        total +
        Number(
          workout.caloriesBurned
        ),
      0
    );

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <main className="min-h-screen border-t border-[#202329] bg-[#0d0f12] px-5 py-9.5 text-white">
        <div className="mx-auto w-full max-w-265">

          <h1 className="text-[23px] font-black uppercase leading-none tracking-[-0.5px]">
            My Plan
          </h1>

          <p className="mt-2.25 text-[12px] leading-4.25 text-[#858b95]">
            Cap of five lifts for
            today. Finish them,
            then load more.
          </p>

          <div className="mt-10 flex h-40 items-center justify-center">
            <p className="text-[11px] text-[#858b95]">
              Loading workouts…
            </p>
          </div>

        </div>
      </main>
    );
  }

  /* =========================================================
     PAGE
  ========================================================= */

  return (
    <main className="min-h-screen border-t border-[#202329] bg-[#0d0f12] px-5 py-9.5 text-white">

      <div className="mx-auto w-full max-w-265">

        {/* HEADER */}

        <section>
          <h1 className="text-[23px] font-black uppercase leading-none tracking-[-0.5px]">
            My Plan
          </h1>

          <p className="mt-2.25 text-[12px] leading-4.25ext-[#858b95]">
            Cap of five lifts for
            today. Finish them,
            then load more.
          </p>
        </section>

        {/* STATS */}

        <section className="mt-5.25 h-27.25 overflow-hidden rounded-[13px] border border-[#272c34] bg-[#15181e]">

          <div className="grid h-full grid-cols-3">

            <Stat
              label="Exercises"
              value={
                totalExercises
              }
              highlight
            />

            <Stat
              label="Minutes"
              value={
                totalMinutes
              }
              bordered
            />

            <Stat
              label="Calories"
              value={
                totalCalories
              }
              bordered
            />

          </div>
        </section>

        {/* CONTROLS */}

        <section className="mt-7.25 flex h-8.75 items-center justify-between">

          {/* TABS */}

          <div className="flex h-8.75 items-center rounded-[9px] border border-[#252a32] bg-[#15181e] p-[4px]">

            <button
              type="button"
              onClick={() =>
                setActiveTab(
                  "plan"
                )
              }
              className={`h-6.75 rounded-[7px] px-3.75 text-[10px] transition ${activeTab ===
                  "plan"
                  ? "bg-[#20252d] font-semibold text-white shadow-sm"
                  : "font-medium text-[#858b95]"
                }`}
            >
              Today&apos;s Plan
            </button>

            <button
              type="button"
              onClick={() =>
                setActiveTab(
                  "saved"
                )
              }
              className={`h-6.75 rounded-[7px] px-4 text-[10px] transition ${activeTab ===
                  "saved"
                  ? "bg-[#20252d] font-semibold text-white shadow-sm"
                  : "font-medium text-[#858b95]"
                }`}
            >
              Saved
            </button>

          </div>

          {/* SORT */}

          <div className="relative flex items-center gap-1.75">

            <span className="text-[10px] text-[#858b95]">
              Sort By
            </span>

            <button
              type="button"
              onClick={() =>
                setShowSort(
                  (previous) =>
                    !previous
                )
              }
              className="flex h-7.75 min-w-20.75 items-center justify-between gap-2.25 rounded-[9px] border border-[#272c34] bg-[#15181e] px-2.5 text-[10px] text-[#d0d3d8]"
            >
              <span>
                {sortBy}
              </span>

              <ChevronDownIcon
                open={
                  showSort
                }
              />
            </button>

            {showSort && (
              <div className="absolute right-0 top-9 z-100 w-27.5 overflow-hidden rounded-[9px] border border-[#272c34] bg-[#15181e] shadow-[0_10px_30px_rgba(0,0,0,0.45)]">

                {(
                  [
                    "Duration",
                    "Calories",
                    "Rating",
                  ] as SortOption[]
                ).map(
                  (
                    option
                  ) => (
                    <button
                      key={
                        option
                      }
                      type="button"
                      onClick={() => {
                        setSortBy(
                          option
                        );

                        setShowSort(
                          false
                        );
                      }}
                      className={`block w-full px-3 py-2.25 text-left text-[10px] transition-colors ${sortBy ===
                          option
                          ? "bg-[#20252d] text-[#c8ff00]"
                          : "text-[#d0d3d8] hover:bg-[#20252d]"
                        }`}
                    >
                      {
                        option
                      }
                    </button>
                  )
                )}

              </div>
            )}

          </div>
        </section>

        {/* WORKOUT LIST */}

        {currentWorkouts.length >
          0 ? (
          <section className="mt-5.5 space-y-3.5">

            {currentWorkouts.map(
              (workout) => (
                <WorkoutCard
                  key={
                    workout.id
                  }
                  workout={
                    workout
                  }
                  activeTab={
                    activeTab
                  }
                  onRemove={
                    activeTab ===
                      "plan"
                      ? removeFromPlan
                      : removeFromSaved
                  }
                  onDone={
                    markAsDone
                  }
                />
              )
            )}

          </section>
        ) : (
          <EmptyState />
        )}

      </div>
    </main>
  );
}


/* =========================================================
   STAT
========================================================= */

function Stat({
  label,
  value,
  highlight = false,
  bordered = false,
}: {
  label: string;
  value: number;
  highlight?: boolean;
  bordered?: boolean;
}) {
  return (
    <div
      className={`flex flex-col justify-center ${bordered
          ? "border-l border-[#292e36] px-7.25"
          : "px-5.25"
        }`}
    >
      <p className="text-[10px] leading-none text-[#858b95]">
        {label}
      </p>

      <p
        className={`mt-2.5 text-[34px] font-black leading-none tracking-[-1px] ${highlight
            ? "text-[#c8ff00]"
            : "text-white"
          }`}
      >
        {value}
      </p>
    </div>
  );
}


/* =========================================================
   WORKOUT CARD
========================================================= */

function WorkoutCard({
  workout,
  activeTab,
  onRemove,
  onDone,
}: {
  workout: Workout;
  activeTab: "plan" | "saved";
  onRemove: (id: number) => void;
  onDone: (id: number) => void;
}) {
  return (
    <article className="h-25.5 overflow-hidden rounded-[11px] border border-[#272c34] bg-[#15181e]">

      <div className="flex h-full items-center px-3.5">

        {/* IMAGE */}

        <div className="relative h-18 w-32.5 shrink-0 overflow-hidden rounded-[7px] bg-[#20242b]">

          <Image
            src={workout.image}
            alt={workout.name}
            fill
            className="object-cover"
            sizes="130px"
          />

        </div>

        {/* CONTENT */}

        <div className="ml-3.5 min-w-0 flex-1">

          <h3 className="truncate text-[13px] font-black uppercase leading-3.75 text-white">
            {workout.name}
          </h3>

          <p className="mt-1 text-[10px] leading-3.25 text-[#858b95]">
            {workout.equipment}
          </p>

          <div className="mt-2.25 flex items-center gap-3.25 text-[9px] leading-none text-[#92969e]">

            <span className="flex items-center gap-1">
              <ClockIcon />
              {Number(
                workout.duration
              )}
              {" "}
              min
            </span>

            <span className="flex items-center gap-1">
              <FlameIcon />
              {Number(
                workout.caloriesBurned
              )}
              {" "}
              kcal
            </span>

            <span className="flex items-center gap-1">
              <StarIcon />
              {Number(
                workout.rating
              ).toFixed(1)}
            </span>

          </div>
        </div>

        {/* ACTIONS */}

        <div className="ml-5 flex shrink-0 items-center gap-2.5">

          <Link
            href={`/workout/${workout.id}`}
            className="flex h-8 items-center rounded-full border border-[#343942] px-4 text-[10px] font-medium text-[#c3c6cb] transition hover:border-[#59606b] hover:text-white"
          >
            View Details
          </Link>

          {activeTab ===
            "plan" && (
              <button
                type="button"
                onClick={() =>
                  onDone(
                    workout.id
                  )
                }
                className="flex h-8 items-center rounded-full bg-[#c8ff00] px-4 text-[10px] font-bold text-black transition hover:bg-[#d5ff3d]"
              >
                <span className="mr-1.25 text-[11px]">
                  ✓
                </span>

                Mark as Done
              </button>
            )}

          <button
            type="button"
            aria-label="Remove workout"
            onClick={() =>
              onRemove(
                workout.id
              )
            }
            className="flex h-7 w-7 items-center justify-center rounded-full text-[17px] leading-none text-[#737982] transition hover:text-white"
          >
            ×
          </button>

        </div>
      </div>
    </article>
  );
}


/* =========================================================
   EMPTY STATE
========================================================= */

function EmptyState() {
  return (
    <section className="mt-5.5 flex h-64 flex-col items-center justify-center rounded-[11px] border border-dashed border-[#242932]">

      <h2 className="text-[17px] font-black uppercase leading-none tracking-[-0.2px]">
        Nothing Here Yet
      </h2>

      <p className="mt-2 text-[11px] text-[#858b95]">
        Browse the library and add a
        lift to get today moving.
      </p>

      <Link
        href="/"
        className="mt-4.75 flex h-8 items-center rounded-full bg-[#c8ff00] px-5 text-[10px] font-bold text-black shadow-[0_5px_18px_rgba(200,255,0,0.15)] transition hover:bg-[#d5ff3d]"
      >
        Go to workouts
      </Link>

    </section>
  );
}


/* =========================================================
   ICONS
========================================================= */

function ClockIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#c8ff00"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle
        cx="12"
        cy="12"
        r="9"
      />

      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function FlameIcon() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="#c8ff00"
    >
      <path d="M13.5 2.5c.3 3.3-1.5 5.2-3.1 6.8-1.5 1.5-2.9 3-2.9 5.5 0 3.2 2.5 5.7 5.7 5.7s5.8-2.5 5.8-5.8c0-4.2-2.8-7.7-5.5-12.2Z" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#c8ff00"
      strokeWidth="2"
      strokeLinejoin="round"
    >
      <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z" />
    </svg>
  );
}

function ChevronDownIcon({
  open,
}: {
  open: boolean;
}) {
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
      className={`transition-transform duration-200 ${open
          ? "rotate-180"
          : ""
        }`}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}