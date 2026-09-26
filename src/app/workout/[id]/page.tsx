import Image from "next/image";
import { notFound } from "next/navigation";
import WorkoutActions from "@/app/components/WorkoutActions";
import { fetchWorkouts, fetchWorkoutById } from "@/app/lib/getWorkouts";

export async function generateStaticParams() {
    const workouts = await fetchWorkouts();
    return workouts.map((workout) => ({
        id: String(workout.id),
    }));
}

const WorkoutPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;

    const workout = await fetchWorkoutById(id);

    if (!workout) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-[#0d0f12] px-3 sm:px-6 py-6 sm:py-9 text-white rounded-xl">
            <div className="mx-auto max-w-6xl">

                <div className="grid grid-cols-1 gap-6 sm:gap-10 lg:grid-cols-2">

                    {/* Workout Image */}
                    <div>
                        <div className="relative aspect-[4/3] sm:aspect-square lg:aspect-[1.02/1] w-full overflow-hidden rounded-xl border border-[#232730] bg-[#171a20]">
                            <Image
                                src={workout.image}
                                alt={workout.name}
                                fill
                                priority
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 50vw"/>
                        </div>
                    </div>

                    {/* Workout Details */}
                    <div className="flex flex-col">
                        {/* Title */}
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase leading-tight tracking-tight text-white">
                            {workout.name}
                        </h1>
                        {/* Description */}
                        <p className="mt-3 max-w-xl text-xs sm:text-sm leading-relaxed text-[#92969e]">
                            {workout.description}
                        </p>
                        {/* Muscle Groups */}
                        <div className="mt-4 flex flex-wrap gap-2">
                            {workout.muscleGroups.map((muscle) => (
                                <span
                                    key={muscle}
                                    className="rounded-full bg-[#c8ff00] px-3 py-1 text-[10px] sm:text-xs font-bold text-black"
                                >
                                    {muscle}
                                </span>
                            ))}
                        </div>
                        {/* Stats */}
                        <div className="mt-5 overflow-hidden rounded-xl border border-[#272c34] bg-[#15181e]">
                            <StatRow label="EQUIPMENT" value={workout.equipment}/>

                            <StatRow label="DIFFICULTY" value={workout.difficulty}/>

                            <StatRow label="SETS" value={String(workout.sets)}/>

                            <StatRow label="REPS" value={workout.reps}/>

                            <StatRow label="DURATION" value={`${workout.duration} min`}/>

                            <StatRow label="CALORIES" value={`${workout.caloriesBurned} kcal`}/>

                            <StatRow label="RATING" value={workout.rating.toFixed(1)} last={true}/>

                        </div>
                        {/* Instructions */}
                        <section className="mt-6">
                            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#e2e4e9]">
                                Instructions
                            </h2>
                            <ol className="mt-3 space-y-2.5">
                                {workout.instructions.map(
                                    (instruction, index) => (
                                        <li
                                            key={index}
                                            className="flex gap-3 text-xs leading-normal text-[#b0b4bb]">
                                            <span className="min-w-4 text-[#92969e] font-semibold">
                                                {index + 1}.
                                            </span>

                                            <span>
                                                {instruction}
                                            </span>
                                        </li>
                                    )
                                )}
                            </ol>
                        </section>
                        {/* Buttons */}
                        <WorkoutActions workout={workout} />
                    </div>
                </div>
            </div>
        </main>
    );
};


/* Stats Row */
function StatRow({
    label,
    value,
    last = false,
}: {
    label: string;
    value: string;
    last?: boolean;
}) {
    return (
        <div
            className={`flex min-h-8.5 items-center justify-between px-4 ${
                !last
                    ? "border-b border-[#252a32]"
                    : ""
            }`}>
            <span className="text-[8px] font-bold tracking-[0.7px] text-[#9297a0]">
                {label}
            </span>

            <span className="text-[10px] font-medium text-[#d5d7db]">
                {value}
            </span>
        </div>
    );
};

export default WorkoutPage;