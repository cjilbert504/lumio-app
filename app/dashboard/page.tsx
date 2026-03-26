import type { Project } from "@/app/api/projects/route";

// Server component — data fetched on the server at request time
async function getStats() {
  const res = await fetch("http://localhost:3000/api/stats", { cache: "no-store" });
  return res.json();
}

async function getProjects(): Promise<Project[]> {
  const res = await fetch("http://localhost:3000/api/projects", { cache: "no-store" });
  return res.json();
}

const statusColors: Record<Project["status"], string> = {
  on_track: "bg-green-100 text-green-700",
  at_risk: "bg-yellow-100 text-yellow-700",
  completed: "bg-gray-100 text-gray-500",
};

const statusLabels: Record<Project["status"], string> = {
  on_track: "On track",
  at_risk: "At risk",
  completed: "Completed",
};

export default async function DashboardPage() {
  const [stats, projects] = await Promise.all([getStats(), getProjects()]);
  const activeProjects = projects.filter((p: Project) => p.status !== "completed");

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Good morning, Jane</h1>
        <p className="text-gray-500 text-sm mt-1">
          Here&apos;s what&apos;s happening across your team today.{" "}
          <span className="text-xs text-gray-400">Data fetched at {new Date(stats.generatedAt).toLocaleTimeString()}</span>
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {[
          { label: "Active projects", value: stats.totalProjects },
          { label: "Open tasks", value: stats.openTasks },
          { label: "Completed this week", value: stats.completedThisWeek },
          { label: "Team members", value: stats.teamMembers },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-5">
            <div className="text-3xl font-bold text-gray-900">{s.value}</div>
            <div className="text-sm text-gray-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Active projects */}
      <div>
        <h2 className="text-base font-semibold text-gray-900 mb-4">Active projects</h2>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {activeProjects.map((project: Project) => (
            <div key={project.id} className="bg-white rounded-xl border border-gray-100 p-5 flex flex-col gap-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="font-semibold text-gray-900 text-sm">{project.name}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{project.description}</div>
                </div>
                <span className={`shrink-0 text-xs font-medium px-2 py-0.5 rounded-full ${statusColors[project.status]}`}>
                  {statusLabels[project.status]}
                </span>
              </div>
              <div>
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${project.status === "at_risk" ? "bg-yellow-400" : "bg-indigo-500"}`}
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>{project.openTasks} open tasks</span>
                <span>Due {new Date(project.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
