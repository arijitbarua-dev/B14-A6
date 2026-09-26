"use client";

import { useEffect, useState } from "react";

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

const PLAN_KEY = "fitlog-plan";
const SAVED_KEY = "fitlog-saved";

const WorkoutActions = ({
    workout,
}: {
    workout: Workout;
}) => {
    const [isInPlan, setIsInPlan] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        const plan = localStorage.getItem(PLAN_KEY);
        const saved = localStorage.getItem(SAVED_KEY);

        const planIds: number[] = plan
            ? JSON.parse(plan)
            : [];

        const savedIds: number[] = saved
            ? JSON.parse(saved)
            : [];

        setIsInPlan(planIds.includes(workout.id));
        setIsSaved(savedIds.includes(workout.id));
    }, [workout.id]);

    const handlePlan = () => {
        const storedPlan = localStorage.getItem(PLAN_KEY);

        const planIds: number[] = storedPlan
            ? JSON.parse(storedPlan)
            : [];

        /* Remove */
        if (planIds.includes(workout.id)) {
            const updatedPlan = planIds.filter(
                (id) => id !== workout.id
            );

            localStorage.setItem(
                PLAN_KEY,
                JSON.stringify(updatedPlan)
            );

            setIsInPlan(false);

            window.dispatchEvent(
                new Event("fitlog-storage-update")
            );

            return;
        }

        /* Maximum 5 */
        if (planIds.length >= 5) {
            alert(
                "You can add up to five exercises to today's plan."
            );

            return;
        }

        /* Add */
        const updatedPlan = [
            ...planIds,
            workout.id,
        ];

        localStorage.setItem(
            PLAN_KEY,
            JSON.stringify(updatedPlan)
        );

        setIsInPlan(true);

        window.dispatchEvent(
            new Event("fitlog-storage-update")
        );
    };

    const handleSave = () => {
        const storedSaved = localStorage.getItem(SAVED_KEY);

        const savedIds: number[] = storedSaved
            ? JSON.parse(storedSaved)
            : [];

        /* Remove */
        if (savedIds.includes(workout.id)) {
            const updatedSaved = savedIds.filter(
                (id) => id !== workout.id
            );

            localStorage.setItem(
                SAVED_KEY,
                JSON.stringify(updatedSaved)
            );

            setIsSaved(false);

            window.dispatchEvent(
                new Event("fitlog-storage-update")
            );

            return;
        }

        /* Save */
        const updatedSaved = [
            ...savedIds,
            workout.id,
        ];

        localStorage.setItem(
            SAVED_KEY,
            JSON.stringify(updatedSaved)
        );

        setIsSaved(true);

        window.dispatchEvent(
            new Event("fitlog-storage-update")
        );
    };

    return (
        <div className="mt-7 flex flex-wrap gap-3">
            {/* Add to Today's Plan */}
            <button
                type="button"
                onClick={handlePlan}
                className={`flex h-8.5 items-center gap-2 rounded-lg px-4 text-[10px] font-bold transition ${
                    isInPlan
                        ? "border border-[#343942] bg-[#20252d] text-[#c8ff00]"
                        : "bg-[#c8ff00] text-black hover:bg-[#d5ff3d]"
                }`}>
                <CalendarIcon/>

                {isInPlan
                    ? "Remove from today's plan"
                    : "Add to today's plan"}
            </button>

            {/* Save for Later */}
            <button
                type="button"
                onClick={handleSave}
                className={`flex h-8.5 items-center gap-2 rounded-lg px-4 text-[10px] font-medium transition ${
                    isSaved
                        ? "border border-[#c8ff00] bg-[#17240f] text-[#c8ff00]"
                        : "border border-[#343942] bg-transparent text-[#c3c6cb] hover:border-[#59606b] hover:text-white"
                }`}>
                <BookmarkIcon/>

                {isSaved
                    ? "Saved"
                    : "Save for later"}
            </button>
        </div>
    );
};

/* Calendar Icon */
function CalendarIcon() {
    return (
        <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        >
            <rect
                x="3"
                y="4"
                width="18"
                height="17"
                rx="2"/>

            <path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
    );
}

/* Bookmark Icon */
function BookmarkIcon() {
    return (
        <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        >
            <path d="M6 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18l-6-3-6 3V4Z" />
        </svg>
    );
}

export default WorkoutActions;