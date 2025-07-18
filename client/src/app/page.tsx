import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-2xl font-bold mb-4">Welcome to Job Importer Admin</h1>
      <nav>
        <Link href="/import-history">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            View Import History
          </button>
        </Link>
      </nav>
    </main>
  );
}
