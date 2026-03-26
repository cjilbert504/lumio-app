import { NextResponse } from "next/server";

// Simulates server-side stats — in a real app this would query a database
export async function GET() {
  const stats = {
    totalProjects: 12,
    openTasks: 47,
    completedThisWeek: 23,
    teamMembers: 8,
    generatedAt: new Date().toISOString(),
  };

  return NextResponse.json(stats);
}
