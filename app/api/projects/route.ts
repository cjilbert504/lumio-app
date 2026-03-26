import { NextResponse } from "next/server";

export type Project = {
  id: string;
  name: string;
  description: string;
  status: "on_track" | "at_risk" | "completed";
  progress: number;
  dueDate: string;
  members: number;
  openTasks: number;
};

const projects: Project[] = [
  {
    id: "1",
    name: "Q2 Product Launch",
    description: "Full rollout of the new onboarding flow and billing overhaul.",
    status: "on_track",
    progress: 68,
    dueDate: "2026-04-30",
    members: 5,
    openTasks: 14,
  },
  {
    id: "2",
    name: "Design System v2",
    description: "Consolidate component library and document all patterns.",
    status: "at_risk",
    progress: 41,
    dueDate: "2026-04-15",
    members: 3,
    openTasks: 22,
  },
  {
    id: "3",
    name: "API v3 Migration",
    description: "Deprecate v1 endpoints and migrate all clients to v3.",
    status: "on_track",
    progress: 85,
    dueDate: "2026-04-10",
    members: 4,
    openTasks: 6,
  },
  {
    id: "4",
    name: "Mobile App Beta",
    description: "Ship the iOS and Android beta to internal testers.",
    status: "at_risk",
    progress: 29,
    dueDate: "2026-05-01",
    members: 6,
    openTasks: 31,
  },
  {
    id: "5",
    name: "SOC 2 Audit Prep",
    description: "Gather evidence and close gaps for the upcoming Type II audit.",
    status: "on_track",
    progress: 72,
    dueDate: "2026-05-15",
    members: 2,
    openTasks: 8,
  },
  {
    id: "6",
    name: "Holiday Campaign",
    description: "Plan and execute the end-of-year marketing push.",
    status: "completed",
    progress: 100,
    dueDate: "2025-12-20",
    members: 3,
    openTasks: 0,
  },
];

export async function GET() {
  return NextResponse.json(projects);
}
