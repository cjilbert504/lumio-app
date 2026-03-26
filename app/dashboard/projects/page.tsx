import Link from "next/link";
import type { Project } from "@/app/api/projects/route";

const baseUrl = `http://localhost:${process.env.PORT ?? 3000}`;

async function getProjects(): Promise<Project[]> {
  const res = await fetch(`${baseUrl}/api/projects`, { cache: "no-store" });
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

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
          <p className="text-gray-500 text-sm mt-1">{projects.length} projects total</p>
        </div>
        <button className="bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
          New project
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-xs text-gray-400 font-medium uppercase tracking-wide">
              <th className="text-left px-5 py-3">Project</th>
              <th className="text-left px-5 py-3">Status</th>
              <th className="text-left px-5 py-3">Progress</th>
              <th className="text-left px-5 py-3">Tasks</th>
              <th className="text-left px-5 py-3">Due date</th>
              <th className="text-left px-5 py-3">Members</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {projects.map((project) => (
              <tr key={project.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-5 py-4">
                  <div className="font-medium text-gray-900">{project.name}</div>
                  <div className="text-xs text-gray-400 mt-0.5 max-w-xs truncate">{project.description}</div>
                </td>
                <td className="px-5 py-4">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusColors[project.status]}`}>
                    {statusLabels[project.status]}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${project.status === "at_risk" ? "bg-yellow-400" : "bg-indigo-500"}`}
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-400">{project.progress}%</span>
                  </div>
                </td>
                <td className="px-5 py-4 text-gray-500">{project.openTasks} open</td>
                <td className="px-5 py-4 text-gray-500">
                  {new Date(project.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </td>
                <td className="px-5 py-4 text-gray-500">{project.members}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 text-center">
        <Link href="/dashboard" className="text-sm text-indigo-600 hover:underline">
          ← Back to dashboard
        </Link>
      </div>
    </div>
  );
}
