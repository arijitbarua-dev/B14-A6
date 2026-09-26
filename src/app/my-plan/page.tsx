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

type SortOption = "Duration" | "Calories" | "Rating";

const MyPlanPage = () => {
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [loading, setLoading] = useState(true);

    const [activeTab, setActiveTab] = useState<"plan" | "saved">(
        "plan"
    );

    const [sortBy, setSortBy] =
        useState<SortOption>("Duration");

    const [showSort, setShowSort] = useState(false);

    const [planIds, setPlanIds] = useState<number[]>([]);
    const [savedIds, setSavedIds] = useState<number[]>([]);

    // READ LOCAL STORAGE
    const readStorage = () => {
        try {
            const storedPlan =
                localStorage.getItem(PLAN_KEY);

            const storedSaved =
                localStorage.getItem(SAVED_KEY);

            setPlanIds(
                storedPlan
                    ? JSON.parse(storedPlan)
                    : []
            );

            setSavedIds(
                storedSaved
                    ? JSON.parse(storedSaved)
                    : []
            );
        } catch (error) {
            console.error(
                "LOCAL STORAGE ERROR:",
                error
            );

            setPlanIds([]);
            setSavedIds([]);
        }
    };

    // FETCH ALL WORKOUTS
    useEffect(() => {
        const loadWorkouts = async () => {
            try {
                setLoading(true);

                const res = await fetch(API_URL);

                if (!res.ok) {
                    throw new Error(
                        `Failed with status: ${res.status}`
                    );
                }

                const data: Workout[] =
                    await res.json();

                setWorkouts(data);

                readStorage();
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

    // UPDATE WHEN WORKOUT BUTTON IS CLICKED
    useEffect(() => {
        readStorage();

        const handleStorageUpdate = () => {
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

    // GET CURRENT LIST
    const currentWorkouts = useMemo(() => {
        const ids =
            activeTab === "plan"
                ? planIds
                : savedIds;

        const list = workouts.filter((workout) =>
            ids.includes(workout.id)
        );

        return [...list].sort((a, b) => {
            if (sortBy === "Duration") {
                return b.duration - a.duration;
            }

            if (sortBy === "Calories") {
                return (
                    b.caloriesBurned -
                    a.caloriesBurned
                );
            }

            if (sortBy === "Rating") {
                return b.rating - a.rating;
            }

            return 0;
        });
    }, [
        workouts,
        planIds,
        savedIds,
        activeTab,
        sortBy,
    ]);

    // REMOVE FROM PLAN
    const removeFromPlan = (id: number) => {
        const updatedPlan = planIds.filter(
            (workoutId) => workoutId !== id
        );

        localStorage.setItem(
            PLAN_KEY,
            JSON.stringify(updatedPlan)
        );

        setPlanIds(updatedPlan);

        window.dispatchEvent(
            new Event("fitlog-storage-update")
        );
    };

    // REMOVE FROM SAVED
    const removeFromSaved = (id: number) => {
        const updatedSaved = savedIds.filter(
            (workoutId) => workoutId !== id
        );

        localStorage.setItem(
            SAVED_KEY,
            JSON.stringify(updatedSaved)
        );

        setSavedIds(updatedSaved);

        window.dispatchEvent(
            new Event("fitlog-storage-update")
        );
    };

    // MARK AS DONE
    const markAsDone = (id: number) => {
        const updatedPlan = planIds.filter(
            (workoutId) => workoutId !== id
        );

        localStorage.setItem(
            PLAN_KEY,
            JSON.stringify(updatedPlan)
        );

        setPlanIds(updatedPlan);

        window.dispatchEvent(
            new Event("fitlog-storage-update")
        );
    };

    // STATS
    const planWorkouts = workouts.filter(
        (workout) =>
            planIds.includes(workout.id)
    );

    const totalExercises =
        planWorkouts.length;

    const totalMinutes =
        planWorkouts.reduce(
            (total, workout) =>
                total + workout.duration,
            0
        );

    const totalCalories =
        planWorkouts.reduce(
            (total, workout) =>
                total + workout.caloriesBurned,
            0
        );

    // LOADING
    if (loading) {
        return (
            <main className="min-h-screen border-t border-[#202329] bg-[#0d0f12] px-5 py-9.5 text-white">
                <div className="mx-auto max-w-252.5">
                    <h1 className="text-[23px] font-black uppercase leading-none tracking-[-0.5px]">
                        My Plan
                    </h1>

                    <p className="mt-2.25 text-[12px] text-[#858b95]">
                        Cap of five lifts for today. Finish them,
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

    return (
        <main className="min-h-screen border-t border-[#202329] bg-[#0d0f12] px-5 py-9.5 text-white">
            <div className="mx-auto max-w-252.5">
                {/* PAGE HEADER */}
                <section>

                    <h1 className="text-[23px] font-black uppercase leading-none tracking-[-0.5px]">
                        My Plan
                    </h1>

                    <p className="mt-2.25 text-[12px] text-[#858b95]">
                        Cap of five lifts for today. Finish them,
                        then load more.
                    </p>

                </section>

                {/* STATS */}
                <section className="mt-5.25 overflow-hidden rounded-[13px] border border-[#272c34] bg-[#15181e]">
                    <div className="grid grid-cols-3">
                        {/* Exercises */}
                        <div className="px-5.25 py-6.75">

                            <p className="text-[10px] text-[#858b95]">
                                Exercises
                            </p>

                            <p className="mt-1.25 text-[34px] font-black leading-none text-[#c8ff00]">
                                {totalExercises}
                            </p>
                        </div>
                        {/* Minutes */}
                        <div className="border-l border-[#292e36] px-6.75 py-6.75">

                            <p className="text-[10px] text-[#858b95]">
                                Minutes
                            </p>

                            <p className="mt-1.25 text-[34px] font-black leading-none">
                                {totalMinutes}
                            </p>
                        </div>
                        {/* Calories */}
                        <div className="border-l border-[#292e36] px-6.75 py-6.75">

                            <p className="text-[10px] text-[#858b95]">
                                Calories
                            </p>

                            <p className="mt-1.25 text-[34px] font-black leading-none">
                                {totalCalories}
                            </p>
                        </div>
                    </div>
                </section>

                {/* CONTROLS */}
                <section className="mt-6.75 flex items-center justify-between">

                    {/* Tabs */}

                    <div className="flex h-8.5 rounded-[9px] border border-[#252a32] bg-[#15181e] p-0.75">

                        <button
                            type="button"
                            onClick={() =>
                                setActiveTab("plan")
                            }
                            className={`rounded-md px-3.75 text-[10px] font-medium transition ${
                                activeTab === "plan" ? "bg-[#20252d] font-semibold text-white shadow-sm" : "text-[#858b95]"
                            }`}>
                            Today&apos;s Plan
                        </button>

                        <button
                            type="button"
                            onClick={() =>
                                setActiveTab("saved")
                            }
                            className={`rounded-md px-4.25 text-[10px] font-medium transition ${
                                activeTab === "saved"
                                    ? "bg-[#20252d] font-semibold text-white shadow-sm"
                                    : "text-[#858b95]"
                            }`}>
                            Saved
                        </button>

                    </div>
                    {/* Sort */}
                    <div className="relative flex items-center gap-1.75">
                        <span className="text-[10px] text-[#858b95]">
                            Sort By
                        </span>
                        <button
                            type="button"
                            onClick={() =>
                                setShowSort(!showSort)
                            }
                            className="flex h-7.5 items-center gap-2 rounded-lg border border-[#272c34] bg-[#15181e] px-2.75 text-[10px] text-[#d0d3d8]">
                            {sortBy}
                            <ChevronDownIcon />
                        </button>
                        {showSort && (
                            <div className="absolute right-0 top-9 z-20 w-28 overflow-hidden rounded-lg border border-[#272c34] bg-[#15181e] shadow-xl">
                                {(
                                    [
                                        "Duration",
                                        "Calories",
                                        "Rating",
                                    ] as SortOption[]
                                ).map((option) => (
                                    <button
                                        key={option}
                                        type="button"
                                        onClick={() => {
                                            setSortBy(
                                                option
                                            );
                                            setShowSort(false);
                                        }}
                                        className={`block w-full px-3 py-2 text-left text-[10px] transition hover:bg-[#20252d] ${
                                            sortBy === option ? "text-[#c8ff00]" : "text-[#d0d3d8]"}`}>
                                        {option}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                {/* WORKOUT LIST */}
                {currentWorkouts.length > 0 ? (
                    <section className="mt-5 space-y-3">
                        {currentWorkouts.map(
                            (workout) => (
                                <WorkoutCard
                                    key={workout.id}
                                    workout={workout}
                                    activeTab={
                                        activeTab
                                    }
                                    onRemove={activeTab === "plan" ? removeFromPlan : removeFromSaved}
                                    onDone={markAsDone}/>
                            )
                        )}
                    </section>
                ) : (
                    // EMPTY STATE
                    <section className="mt-5 flex h-64 flex-col items-center justify-center rounded-[11px] border border-dashed border-[#242932] bg-transparent">

                        <h2 className="text-[17px] font-black uppercase leading-none tracking-[-0.2px]">
                            Nothing Here Yet
                        </h2>

                        <p className="mt-2 text-[11px] text-[#858b95]">
                            Browse the library and add a lift
                            to get today moving.
                        </p>

                        <Link
                            href="/"
                            className="mt-4.75 flex h-8 items-center rounded-full bg-[#c8ff00] px-5 text-[10px] font-bold text-black shadow-[0_5px_18px_rgba(200,255,0,0.15)] transition hover:bg-[#d5ff3d]">
                            Go to workouts
                        </Link>
                    </section>
                )}
            </div>
        </main>
    );
};


// WORKOUT CARD
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
        <div className="overflow-hidden rounded-[11px] border border-[#272c34] bg-[#15181e]">
            <div className="flex items-center gap-4 p-3">
                {/* Image */}
                <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-[7px] bg-[#20242b]">

                    <Image
                        src={workout.image}
                        alt={workout.name}
                        fill
                        className="object-cover"
                        sizes="96px"/>

                </div>
                {/* Content */}
                <div className="min-w-0 flex-1">
                    <h3 className="truncate text-[13px] font-black uppercase text-white">
                        {workout.name}
                    </h3>

                    <p className="mt-1 text-[10px] text-[#858b95]">
                        {workout.equipment}
                    </p>
                    {/* Stats */}
                    <div className="mt-3 flex items-center gap-4 text-[9px] text-[#92969e]">

                        <span>
                            ◷ {workout.duration} min
                        </span>

                        <span>
                            🔥 {workout.caloriesBurned} kcal
                        </span>

                        <span>
                            ★ {workout.rating.toFixed(1)}
                        </span>
                    </div>
                </div>
                {/* Actions */}
                <div className="flex shrink-0 items-center gap-2">

                    <Link
                        href={`/workout/${workout.id}`}
                        className="hidden rounded-lg border border-[#343942] px-3 py-2 text-[9px] font-medium text-[#c3c6cb] transition hover:border-[#59606b] hover:text-white sm:block">
                        View Details
                    </Link>

                    {activeTab === "plan" && (
                        <button
                            type="button"
                            onClick={() =>
                                onDone(
                                    workout.id
                                )
                            }
                            className="hidden rounded-lg bg-[#c8ff00] px-3 py-2 text-[9px] font-bold text-black transition hover:bg-[#d5ff3d] sm:block">
                            Mark as Done
                        </button>
                    )}
                    <button
                        type="button"
                        onClick={() =>
                            onRemove(
                                workout.id
                            )
                        }
                        className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#343942] text-[11px] text-[#858b95] transition hover:border-red-500 hover:text-red-400">
                        ×
                    </button>
                </div>
            </div>
        </div>
    );
}


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
        >
            <path d="m6 9 6 6 6-6" />
        </svg>
    );
};

export default MyPlanPage;