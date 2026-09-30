/**
 * models.ts: EXPORTING TYPES
 *
 * Interfaces and types can be exported just like functions.
 * Files that import only the types must use "import type" (see main.ts section 6).
 */

export type Grade = "A" | "B" | "C" | "D" | "E";

export interface Student {
  name: string;
  score: number;
  grade: Grade;
}

export function gradeFor(score: number): Grade {
  if (score >= 80) return "A";
  if (score >= 70) return "B";
  if (score >= 60) return "C";
  if (score >= 50) return "D";
  return "E";
}

export function createStudent(name: string, score: number): Student {
  return { name, score, grade: gradeFor(score) };
}
