import { FALLBACK_WORKOUTS, Workout } from "@/app/data/fallbackWorkouts";

export async function fetchWorkouts(): Promise<Workout[]> {
  try {
    const res = await fetch("https://api.abcz.workers.dev/api/fitlog", {
      next: {
        revalidate: 10,
      },
    });

    if (!res.ok) {
      console.warn(`API response status ${res.status}. Using fallback workout data.`);
      return FALLBACK_WORKOUTS;
    }

    const text = await res.text();
    try {
      const data = JSON.parse(text);
      if (Array.isArray(data) && data.length > 0) {
        return data;
      }
    } catch {
      console.warn("Failed to parse API response as JSON. Using fallback workout data.");
      return FALLBACK_WORKOUTS;
    }

    return FALLBACK_WORKOUTS;
  } catch (error) {
    console.warn("Network error during API fetch. Using fallback workout data:", error);
    return FALLBACK_WORKOUTS;
  }
}

export async function fetchWorkoutById(id: string): Promise<Workout | null> {
  const workouts = await fetchWorkouts();
  return workouts.find((w) => w.id === Number(id)) ?? null;
}
