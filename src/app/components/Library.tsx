import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { fetchWorkouts } from '@/app/lib/getWorkouts';

const LibrarySection = async () => {
    const library = await fetchWorkouts();

    return (
        <section className="mt-10.5 pb-10">
            {/* Section heading */}
            <div className="mb-5">
                <h2 className="font-[var(--font-roboto-condensed)] text-[24px]
                        font-black
                        uppercase
                        leading-none
                        tracking-[-0.6px]
                        text-[#f5f5f5]">
                    THE LIBRARY
                </h2>

                <p className="mt-1.5 text-[10px] leading-none text-[#777d88]">
                    Twelve lifts covering every major muscle group.
                </p>
            </div>

            {/* Library grid */}
            <div className="grid grid-cols-3 gap-x-4 gap-y-4 max-lg:grid-cols-2 max-sm:grid-cols-1">
                {library.map((workout) => (
                    <Link
                        key={workout.id}
                        href={`/workout/${workout.id}`}
                        className="block"
                    >
                        <article
                            className="overflow-hidden rounded-[10px] border border-[#292c33] bg-[#15171c]"
                        >
                            {/* Workout image */}
                            <div className="relative h-47.5 w-full overflow-hidden bg-[#101216]">
                                <Image
                                    src={workout.image}
                                    alt={workout.name}
                                    fill
                                    className="object-cover object-[center_25%] p-1"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                />
                            </div>

                            {/* Card body */}
                            <div className="px-4 pb-3.5 pt-3.25">
                                {/* Muscle groups */}
                                <div className="mb-2.75 flex min-h-4.25 flex-wrap gap-1.25">
                                    {workout.muscleGroups.map((muscle) => (
                                        <span
                                            key={muscle}
                                            className="inline-flex h-3.75 items-center rounded-lg bg-[#baff00] px-2 text-[8px] font-black uppercase leading-none text-[#090a08]"
                                        >
                                            {muscle}
                                        </span>
                                    ))}
                                </div>

                                {/* Workout name */}
                                <h3
                                    className="
                                        font-[var(--font-roboto-condensed)]
                                        text-[14px]
                                        font-black
                                        uppercase
                                        leading-[1]
                                        tracking-[0.1px]
                                        text-[#f5f5f5]"
                                >
                                    {workout.name}
                                </h3>

                                {/* Equipment */}
                                <p className="mt-1.25 text-[9px] leading-none text-[#666c76]">
                                    {workout.equipment}
                                </p>

                                {/* Divider */}
                                <div className="my-2.5 h-px bg-[#22252b]" />

                                {/* Metadata */}
                                <div className="flex items-center gap-3 text-[9px] leading-none text-[#777d88]">
                                    <span className="flex items-center gap-1">
                                        <span className="text-[10px] text-[#737983]">
                                            ◷
                                        </span>
                                        {workout.duration} min
                                    </span>

                                    <span className="flex items-center gap-1">
                                        <span className="text-[8px] text-[#737983]">
                                            ●
                                        </span>
                                        {workout.caloriesBurned} kcal
                                    </span>

                                    <span className="flex items-center gap-1">
                                        <span className="text-[10px] text-[#737983]">
                                            ☆
                                        </span>
                                        {workout.rating}
                                    </span>
                                </div>
                            </div>
                        </article>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default LibrarySection;