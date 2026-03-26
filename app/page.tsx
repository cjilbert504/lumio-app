import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-full flex flex-col items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="text-4xl font-bold text-indigo-600 mb-2">Lumio</div>
        <p className="text-gray-500 mb-8">Sign in to access your workspace</p>
        <Link
          href="/dashboard"
          className="bg-indigo-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-indigo-700 transition-colors"
        >
          Enter dashboard →
        </Link>
      </div>
    </div>
  );
}
