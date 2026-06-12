// ---------------------------------------------------------------------------
// Comprehensive exercise library
// Each exercise: { id, label, unit, muscles, category }
// muscles[0] = primary, rest = secondary
// category = for grouping in the dropdown
// ---------------------------------------------------------------------------

export const EXERCISE_LIBRARY = [
  // ── CHEST ──
  { id: "bench_press",         label: "Bench Press",              unit: "reps", muscles: ["chest", "triceps", "shoulders"], category: "Chest" },
  { id: "incline_bench_press", label: "Incline Bench Press",      unit: "reps", muscles: ["chest", "triceps", "shoulders"], category: "Chest" },
  { id: "decline_bench_press", label: "Decline Bench Press",      unit: "reps", muscles: ["chest", "triceps"],             category: "Chest" },
  { id: "pushup",              label: "Push-up",                  unit: "reps", muscles: ["chest", "triceps", "shoulders"], category: "Chest" },
  { id: "incline_pushup",      label: "Incline Push-up",          unit: "reps", muscles: ["chest", "triceps"],             category: "Chest" },
  { id: "decline_pushup",      label: "Decline Push-up",          unit: "reps", muscles: ["chest", "triceps", "shoulders"], category: "Chest" },
  { id: "diamond_pushup",      label: "Diamond Push-up",          unit: "reps", muscles: ["triceps", "chest"],             category: "Chest" },
  { id: "chest_fly",           label: "Chest Fly",                unit: "reps", muscles: ["chest"],                        category: "Chest" },
  { id: "cable_crossover",     label: "Cable Crossover",          unit: "reps", muscles: ["chest", "shoulders"],           category: "Chest" },
  { id: "dip",                 label: "Dip",                      unit: "reps", muscles: ["triceps", "chest", "shoulders"], category: "Chest" },
  { id: "chest_press_machine", label: "Chest Press Machine",      unit: "reps", muscles: ["chest", "triceps", "shoulders"], category: "Chest" },

  // ── BACK ──
  { id: "pullup",              label: "Pull-up",                  unit: "reps", muscles: ["back", "biceps"],               category: "Back" },
  { id: "chinup",              label: "Chin-up",                  unit: "reps", muscles: ["back", "biceps"],               category: "Back" },
  { id: "lat_pulldown",        label: "Lat Pulldown",             unit: "reps", muscles: ["back", "biceps"],               category: "Back" },
  { id: "seated_row",          label: "Seated Cable Row",         unit: "reps", muscles: ["back", "biceps"],               category: "Back" },
  { id: "bent_over_row",       label: "Bent Over Row",            unit: "reps", muscles: ["back", "biceps"],               category: "Back" },
  { id: "t_bar_row",           label: "T-Bar Row",                unit: "reps", muscles: ["back", "biceps"],               category: "Back" },
  { id: "inverted_row",        label: "Inverted Row",             unit: "reps", muscles: ["back", "biceps"],               category: "Back" },
  { id: "single_arm_row",      label: "Single Arm Dumbbell Row",  unit: "reps", muscles: ["back", "biceps"],               category: "Back" },
  { id: "deadlift",            label: "Deadlift",                 unit: "reps", muscles: ["back", "glutes", "hamstrings"], category: "Back" },
  { id: "romanian_deadlift",   label: "Romanian Deadlift",        unit: "reps", muscles: ["hamstrings", "glutes", "back"], category: "Back" },
  { id: "good_morning",        label: "Good Morning",             unit: "reps", muscles: ["back", "hamstrings"],           category: "Back" },
  { id: "face_pull",           label: "Face Pull",                unit: "reps", muscles: ["shoulders", "back"],            category: "Back" },
  { id: "back_extension",      label: "Back Extension",           unit: "reps", muscles: ["back", "glutes"],               category: "Back" },
  { id: "dead_hang",           label: "Dead Hang",                unit: "sec",  muscles: ["back", "core"],                 category: "Back" },

  // ── SHOULDERS ──
  { id: "overhead_press",      label: "Overhead Press",           unit: "reps", muscles: ["shoulders", "triceps"],         category: "Shoulders" },
  { id: "shoulder_press",      label: "Dumbbell Shoulder Press",  unit: "reps", muscles: ["shoulders", "triceps"],         category: "Shoulders" },
  { id: "arnold_press",        label: "Arnold Press",             unit: "reps", muscles: ["shoulders", "triceps"],         category: "Shoulders" },
  { id: "lateral_raise",       label: "Lateral Raise",            unit: "reps", muscles: ["shoulders"],                    category: "Shoulders" },
  { id: "front_raise",         label: "Front Raise",              unit: "reps", muscles: ["shoulders"],                    category: "Shoulders" },
  { id: "reverse_fly",         label: "Reverse Fly",              unit: "reps", muscles: ["shoulders", "back"],            category: "Shoulders" },
  { id: "upright_row",         label: "Upright Row",              unit: "reps", muscles: ["shoulders", "back"],            category: "Shoulders" },
  { id: "pike_pushup",         label: "Pike Push-up",             unit: "reps", muscles: ["shoulders", "triceps"],         category: "Shoulders" },
  { id: "handstand_pushup",    label: "Handstand Push-up",        unit: "reps", muscles: ["shoulders", "triceps"],         category: "Shoulders" },
  { id: "shrug",               label: "Shrug",                    unit: "reps", muscles: ["shoulders", "back"],            category: "Shoulders" },

  // ── ARMS: BICEPS ──
  { id: "bicep_curl",          label: "Bicep Curl",               unit: "reps", muscles: ["biceps"],                       category: "Arms" },
  { id: "hammer_curl",         label: "Hammer Curl",              unit: "reps", muscles: ["biceps"],                       category: "Arms" },
  { id: "preacher_curl",       label: "Preacher Curl",            unit: "reps", muscles: ["biceps"],                       category: "Arms" },
  { id: "concentration_curl",  label: "Concentration Curl",       unit: "reps", muscles: ["biceps"],                       category: "Arms" },
  { id: "cable_curl",          label: "Cable Curl",               unit: "reps", muscles: ["biceps"],                       category: "Arms" },
  { id: "incline_curl",        label: "Incline Dumbbell Curl",    unit: "reps", muscles: ["biceps"],                       category: "Arms" },
  { id: "reverse_curl",        label: "Reverse Curl",             unit: "reps", muscles: ["biceps"],                       category: "Arms" },

  // ── ARMS: TRICEPS ──
  { id: "tricep_pushdown",     label: "Tricep Pushdown",          unit: "reps", muscles: ["triceps"],                      category: "Arms" },
  { id: "tricep_ext",          label: "Overhead Tricep Extension", unit: "reps", muscles: ["triceps"],                     category: "Arms" },
  { id: "skull_crusher",       label: "Skull Crusher",            unit: "reps", muscles: ["triceps"],                      category: "Arms" },
  { id: "close_grip_bench",    label: "Close Grip Bench Press",   unit: "reps", muscles: ["triceps", "chest"],             category: "Arms" },
  { id: "bench_dip",           label: "Bench Dip",                unit: "reps", muscles: ["triceps"],                      category: "Arms" },
  { id: "kickback",            label: "Tricep Kickback",          unit: "reps", muscles: ["triceps"],                      category: "Arms" },

  // ── CORE ──
  { id: "plank",               label: "Plank",                    unit: "sec",  muscles: ["core"],                         category: "Core" },
  { id: "side_plank",          label: "Side Plank",               unit: "sec",  muscles: ["core"],                         category: "Core" },
  { id: "crunch",              label: "Crunch",                   unit: "reps", muscles: ["core"],                         category: "Core" },
  { id: "sit_up",              label: "Sit-up",                   unit: "reps", muscles: ["core"],                         category: "Core" },
  { id: "leg_raise",           label: "Leg Raise",                unit: "reps", muscles: ["core"],                         category: "Core" },
  { id: "russian_twist",       label: "Russian Twist",            unit: "reps", muscles: ["core"],                         category: "Core" },
  { id: "mountain_climber",    label: "Mountain Climber",         unit: "reps", muscles: ["core", "shoulders"],            category: "Core" },
  { id: "bicycle_crunch",      label: "Bicycle Crunch",           unit: "reps", muscles: ["core"],                         category: "Core" },
  { id: "hollow_hold",         label: "Hollow Hold",              unit: "sec",  muscles: ["core"],                         category: "Core" },
  { id: "ab_wheel",            label: "Ab Wheel Rollout",         unit: "reps", muscles: ["core", "shoulders"],            category: "Core" },
  { id: "toes_to_bar",         label: "Toes to Bar",              unit: "reps", muscles: ["core", "back"],                 category: "Core" },
  { id: "cable_crunch",        label: "Cable Crunch",             unit: "reps", muscles: ["core"],                         category: "Core" },
  { id: "dragon_flag",         label: "Dragon Flag",              unit: "reps", muscles: ["core"],                         category: "Core" },
  { id: "dead_bug",            label: "Dead Bug",                 unit: "reps", muscles: ["core"],                         category: "Core" },

  // ── LEGS ──
  { id: "squat",               label: "Squat",                    unit: "reps", muscles: ["quads", "glutes", "hamstrings"], category: "Legs" },
  { id: "goblet_squat",        label: "Goblet Squat",             unit: "reps", muscles: ["quads", "glutes"],              category: "Legs" },
  { id: "front_squat",         label: "Front Squat",              unit: "reps", muscles: ["quads", "glutes"],              category: "Legs" },
  { id: "bulgarian_split",     label: "Bulgarian Split Squat",    unit: "reps", muscles: ["quads", "glutes"],              category: "Legs" },
  { id: "lunge",               label: "Lunge",                    unit: "reps", muscles: ["quads", "glutes"],              category: "Legs" },
  { id: "step_up",             label: "Step Up",                  unit: "reps", muscles: ["quads", "glutes"],              category: "Legs" },
  { id: "leg_press",           label: "Leg Press",                unit: "reps", muscles: ["quads", "glutes"],              category: "Legs" },
  { id: "leg_extension",       label: "Leg Extension",            unit: "reps", muscles: ["quads"],                        category: "Legs" },
  { id: "leg_curl",            label: "Leg Curl",                 unit: "reps", muscles: ["hamstrings"],                   category: "Legs" },
  { id: "nordic_curl",         label: "Nordic Curl",              unit: "reps", muscles: ["hamstrings"],                   category: "Legs" },
  { id: "hip_thrust",          label: "Hip Thrust",               unit: "reps", muscles: ["glutes", "hamstrings"],         category: "Legs" },
  { id: "glute_bridge",        label: "Glute Bridge",             unit: "reps", muscles: ["glutes", "hamstrings"],         category: "Legs" },
  { id: "calf_raise",          label: "Calf Raise",               unit: "reps", muscles: ["calves"],                      category: "Legs" },
  { id: "wall_sit",            label: "Wall Sit",                 unit: "sec",  muscles: ["quads"],                        category: "Legs" },
  { id: "box_jump",            label: "Box Jump",                 unit: "reps", muscles: ["quads", "glutes"],              category: "Legs" },

  // ── FULL BODY / COMPOUND ──
  { id: "clean",               label: "Power Clean",              unit: "reps", muscles: ["back", "shoulders", "quads"],   category: "Full Body" },
  { id: "thruster",            label: "Thruster",                 unit: "reps", muscles: ["quads", "shoulders", "core"],   category: "Full Body" },
  { id: "burpee",              label: "Burpee",                   unit: "reps", muscles: ["chest", "core", "quads"],       category: "Full Body" },
  { id: "turkish_getup",       label: "Turkish Get-Up",           unit: "reps", muscles: ["shoulders", "core"],            category: "Full Body" },
  { id: "kettlebell_swing",    label: "Kettlebell Swing",         unit: "reps", muscles: ["glutes", "hamstrings", "back"], category: "Full Body" },
  { id: "clean_and_press",     label: "Clean and Press",          unit: "reps", muscles: ["shoulders", "back", "quads"],   category: "Full Body" },
  { id: "farmers_carry",       label: "Farmer's Carry",           unit: "sec",  muscles: ["core", "back", "shoulders"],    category: "Full Body" },
];

// Group by category for dropdown display
export const EXERCISE_CATEGORIES = [...new Set(EXERCISE_LIBRARY.map(e => e.category))];

export function getExercisesByCategory(category) {
  return EXERCISE_LIBRARY.filter(e => e.category === category);
}

// All unique muscle IDs referenced in the library
export const ALL_MUSCLE_IDS = [...new Set(EXERCISE_LIBRARY.flatMap(e => e.muscles))];

// Extra muscle groups needed for legs etc that aren't in the built-in set
export const EXTENDED_MUSCLE_GROUPS = {
  quads:      { label: "Quads",      emoji: "🦵", color: "#7c3aed", lightBg: "#faf5ff", border: "#e9d5ff" },
  hamstrings: { label: "Hamstrings", emoji: "🦵", color: "#6d28d9", lightBg: "#f5f3ff", border: "#ddd6fe" },
  glutes:     { label: "Glutes",     emoji: "🍑", color: "#db2777", lightBg: "#fdf2f8", border: "#fbcfe8" },
  calves:     { label: "Calves",     emoji: "🦶", color: "#0891b2", lightBg: "#ecfeff", border: "#a5f3fc" },
};
