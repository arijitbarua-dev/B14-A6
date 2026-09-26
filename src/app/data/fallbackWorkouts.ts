export type Workout = {
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

export const FALLBACK_WORKOUTS: Workout[] = [
    {
        id: 1,
        name: "Barbell Back Squat",
        image: "https://img.magnific.com/free-photo/3d-cartoon-fitness-man_23-2151691400.jpg?w=740",
        muscleGroups: ["Quads", "Glutes", "Core"],
        equipment: "Barbell, Squat Rack",
        difficulty: "Intermediate",
        duration: 25,
        caloriesBurned: 220,
        sets: 4,
        reps: "8-10",
        rating: 4.9,
        description: "The king of lower body compound exercises. Targets quadriceps, glutes, hamstrings, and lower back stability.",
        instructions: [
            "Set the barbell at shoulder height on the rack.",
            "Step under the bar and place it securely across your upper back/traps.",
            "Unrack the bar, take two steps back, and set feet shoulder-width apart.",
            "Inhale, brace your core, and lower your hips down until thighs are parallel to the floor.",
            "Drive through your heels to return to standing while exhaling."
        ]
    },
    {
        id: 2,
        name: "Barbell Bench Press",
        image: "https://img.magnific.com/free-photo/3d-cartoon-fitness-man_23-2151691401.jpg?w=740",
        muscleGroups: ["Chest", "Triceps", "Shoulders"],
        equipment: "Barbell, Flat Bench",
        difficulty: "Intermediate",
        duration: 20,
        caloriesBurned: 180,
        sets: 4,
        reps: "6-8",
        rating: 4.8,
        description: "A foundational upper-body push exercise that builds maximum chest density, shoulder strength, and tricep power.",
        instructions: [
            "Lie flat on the bench with your eyes directly beneath the bar.",
            "Grip the bar slightly wider than shoulder-width with wrists straight.",
            "Unrack the bar and position it directly over your chest.",
            "Lower the bar under control until it lightly touches your mid-chest.",
            "Press the bar upward explosively back to starting position."
        ]
    },
    {
        id: 3,
        name: "Conventional Deadlift",
        image: "https://img.magnific.com/free-photo/portrait-anime-character-doing-fitness-exercising_23-2151666703.jpg?w=740",
        muscleGroups: ["Back", "Hamstrings", "Glutes"],
        equipment: "Barbell, Bumper Plates",
        difficulty: "Advanced",
        duration: 30,
        caloriesBurned: 260,
        sets: 3,
        reps: "5",
        rating: 4.9,
        description: "Ultimate test of full-body posterior chain strength, developing massive traps, erectors, and grip force.",
        instructions: [
            "Stand with mid-foot directly beneath the barbell.",
            "Hinge at hips to grip the bar just outside your knees.",
            "Bend knees until shins touch the bar, pull chest up to flatten your spine.",
            "Take a deep breath into abdomen, engage lats, and pull weight up smoothly.",
            "Stand tall, then lower weight under control back to the platform."
        ]
    },
    {
        id: 4,
        name: "Overhead Shoulder Press",
        image: "https://img.magnific.com/free-photo/portrait-anime-character-doing-fitness-exercising_23-2151666664.jpg?w=740",
        muscleGroups: ["Shoulders", "Triceps", "Upper Chest"],
        equipment: "Barbell",
        difficulty: "Intermediate",
        duration: 20,
        caloriesBurned: 160,
        sets: 4,
        reps: "8-10",
        rating: 4.7,
        description: "Strict standing barbell press for building broad, powerful deltoids and total core stabilization.",
        instructions: [
            "Rest barbell on your front deltoids with hands slightly wider than shoulders.",
            "Brace core and squeeze glutes tight to maintain a solid base.",
            "Press bar straight upward, tucking head slightly back as it passes your face.",
            "Lock out arms overhead with bar centered over shoulder joints.",
            "Lower bar under control back to clavicle level."
        ]
    },
    {
        id: 5,
        name: "Bodyweight Pull-Ups",
        image: "https://img.magnific.com/free-photo/3d-cartoon-fitness-man_23-2151691489.jpg?w=740",
        muscleGroups: ["Lats", "Biceps", "Upper Back"],
        equipment: "Pull-Up Bar",
        difficulty: "Intermediate",
        duration: 15,
        caloriesBurned: 140,
        sets: 4,
        reps: "8-12",
        rating: 4.8,
        description: "The gold standard bodyweight upper body pull exercise for lat width and upper body pulling power.",
        instructions: [
            "Grip pull-up bar with an overhand grip slightly wider than shoulders.",
            "Hang with fully extended arms and core engaged.",
            "Pull chest toward the bar by driving elbows down and back.",
            "Continue pulling until chin clears the bar.",
            "Lower yourself steadily back to full dead hang."
        ]
    },
    {
        id: 6,
        name: "Bent-Over Barbell Row",
        image: "https://img.magnific.com/free-photo/portrait-anime-character-doing-fitness-exercising_23-2151666702.jpg?w=740",
        muscleGroups: ["Lats", "Rhomboids", "Lower Back"],
        equipment: "Barbell",
        difficulty: "Intermediate",
        duration: 20,
        caloriesBurned: 175,
        sets: 4,
        reps: "8-10",
        rating: 4.6,
        description: "Heavy horizontal pulling movement to carve back thickness, lat width, and postural strength.",
        instructions: [
            "Hinge forward at hips with knees slightly bent until torso is roughly 45 degrees.",
            "Grip barbell overhand with hands shoulder-width apart.",
            "Pull bar toward lower abdomen/navel, pulling shoulder blades together.",
            "Pause briefly at peak contraction.",
            "Lower bar under control until arms are fully extended."
        ]
    },
    {
        id: 7,
        name: "Incline Dumbbell Press",
        image: "https://img.magnific.com/free-photo/3d-cartoon-business-character_1048-16544.jpg?w=740",
        muscleGroups: ["Upper Chest", "Front Delts", "Triceps"],
        equipment: "Dumbbells, Adjustable Bench",
        difficulty: "Beginner",
        duration: 20,
        caloriesBurned: 165,
        sets: 3,
        reps: "10-12",
        rating: 4.7,
        description: "Targets upper clavicular head of pectorals for balanced chest development.",
        instructions: [
            "Set incline bench between 30 and 45 degrees.",
            "Sit with dumbbells resting on thighs, then kick back onto bench.",
            "Press dumbbells straight up above shoulders with palms facing forward.",
            "Lower dumbbells controlled to upper chest level.",
            "Press back up dynamically while squeezing upper chest."
        ]
    },
    {
        id: 8,
        name: "Romanian Deadlift (RDL)",
        image: "https://img.magnific.com/free-photo/3d-cartoon-fitness-man_23-2151691505.jpg?w=740",
        muscleGroups: ["Hamstrings", "Glutes", "Erectors"],
        equipment: "Barbell or Dumbbells",
        difficulty: "Intermediate",
        duration: 20,
        caloriesBurned: 190,
        sets: 4,
        reps: "10-12",
        rating: 4.8,
        description: "Hip-hinge isolation movement focused on eccentric hamstring stretch and glute hypertrophy.",
        instructions: [
            "Stand holding barbell at hip level with soft bend in knees.",
            "Push hips back as far as possible while keeping bar close to legs.",
            "Lower bar until deep hamstring stretch is felt (around mid-shin).",
            "Drive hips forward to return to standing position."
        ]
    },
    {
        id: 9,
        name: "Parallel Bar Dips",
        image: "https://img.magnific.com/free-photo/portrait-anime-character-doing-fitness-exercising_23-2151666701.jpg?w=740",
        muscleGroups: ["Chest", "Triceps", "Shoulders"],
        equipment: "Dip Station / Parallel Bars",
        difficulty: "Intermediate",
        duration: 15,
        caloriesBurned: 145,
        sets: 3,
        reps: "10-15",
        rating: 4.6,
        description: "Bodyweight upper body pusher building tricep horseshoe sweep and lower chest flare.",
        instructions: [
            "Mount parallel dip bars and support your full weight with arms locked out.",
            "Lean torso slightly forward to engage lower chest.",
            "Lower body by bending elbows until upper arms are parallel to floor.",
            "Press back up powerfully to starting locked-out position."
        ]
    },
    {
        id: 10,
        name: "Dumbbell Bicep Curls",
        image: "https://img.magnific.com/free-photo/3d-cartoon-fitness-man_23-2151691429.jpg?w=740",
        muscleGroups: ["Biceps", "Forearms"],
        equipment: "Dumbbells",
        difficulty: "Beginner",
        duration: 15,
        caloriesBurned: 120,
        sets: 3,
        reps: "12-15",
        rating: 4.5,
        description: "Classic arm builder isolating peak contraction of biceps brachii.",
        instructions: [
            "Stand tall holding dumbbells at sides with palms facing inward.",
            "Curl weights upward while supinating wrists so palms face shoulders at top.",
            "Squeeze biceps hard for 1 second at top.",
            "Lower dumbbells under control to starting neutral grip."
        ]
    },
    {
        id: 11,
        name: "Dumbbell Lateral Raise",
        image: "https://img.magnific.com/free-photo/portrait-anime-character-doing-fitness-exercising_23-2151666704.jpg?w=740",
        muscleGroups: ["Side Delts", "Traps"],
        equipment: "Dumbbells",
        difficulty: "Beginner",
        duration: 15,
        caloriesBurned: 110,
        sets: 4,
        reps: "12-15",
        rating: 4.7,
        description: "Isolates lateral head of shoulder deltoids for maximum upper body width and capping.",
        instructions: [
            "Stand with dumbbells hanging at side hips.",
            "With slight bend in elbows, raise arms out to sides until parallel with floor.",
            "Lead with elbows and keep pinkies slightly higher than thumbs.",
            "Lower weights smoothly under tension."
        ]
    },
    {
        id: 12,
        name: "Hanging Leg Raises",
        image: "https://img.magnific.com/free-photo/3d-cartoon-fitness-man_23-2151691487.jpg?w=740",
        muscleGroups: ["Core", "Abs", "Hip Flexors"],
        equipment: "Pull-Up Bar",
        difficulty: "Intermediate",
        duration: 15,
        caloriesBurned: 130,
        sets: 3,
        reps: "12-15",
        rating: 4.8,
        description: "Advanced core builder targeting lower rectus abdominis and deep abdominal stabilizers.",
        instructions: [
            "Hang from pull-up bar with overhand grip and legs straight down.",
            "Keep legs together and raise them up by flexing hips and abs.",
            "Lift legs until parallel to floor or higher.",
            "Lower legs slowly back down without swinging body."
        ]
    }
];
