import Image from "next/image";
import { notFound } from "next/navigation";
import WorkoutActions from "@/app/components/WorkoutActions";

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

const getWorkout = async (id: string): Promise<Workout | null> => {
    try {
        const res = await fetch("https://api.abcz.workers.dev/api/fitlog",{
                next: {
                    revalidate: 10,
                },
            }
        );

        if (!res.ok) {
            throw new Error(`Failed with status: ${res.status}`);
        }

        const workouts: Workout[] = await res.json();

        return (
            workouts.find(
                (workout) => workout.id === Number(id)
            ) ?? null
        );
    } catch (error) {
        console.error("FETCH ERROR:", error);
        throw new Error("Failed to fetch workout");
    }
};

const WorkoutPage = async ({params,}: {params: Promise<{ id: string }>;}) => {
    const { id } = await params;

    const workout = await getWorkout(id);

    if (!workout) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-[#0d0f12] px-5 py-8.5 text-white">
            <div className="mx-auto max-w-300">

                <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.02fr_1fr] lg:gap-10">

                    {/* Workout Image */}
                    <div>
                        <div className="relative aspect-[1.02/1] w-full overflow-hidden rounded-[10px] bg-[#171a20]">
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
                        <h1 className="text-[27px] font-black uppercase leading-[0.95] tracking-[-0.8px] sm:text-[29px]">
                            {workout.name}
                        </h1>
                        {/* Description */}
                        <p className="mt-3 max-w-130 text-[12px] leading-[1.65] text-[#92969e]">
                            {workout.description}
                        </p>
                        {/* Muscle Groups */}
                        <div className="mt-4 flex flex-wrap gap-2">
                            {workout.muscleGroups.map((muscle) => (
                                <span
                                    key={muscle}
                                    className="rounded-full bg-[#c8ff00] px-3.25 py-1 text-[10px] font-semibold text-black"
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

                            <StatRow label="RATING" value={workout.rating.toFixed(1)}/>

                        </div>
                        {/* Instructions */}
                        <section className="mt-6">
                            <h2 className="text-[13px] font-bold uppercase tracking-[0.3px]">
                                Instructions
                            </h2>
                            <ol className="mt-3 space-y-2.5">
                                {workout.instructions.map(
                                    (instruction, index) => (
                                        <li
                                            key={index}
                                            className="flex gap-3 text-[11px] leading-normal text-[#b0b4bb]">
                                            <span className="min-w-2.5 text-[#92969e]">
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