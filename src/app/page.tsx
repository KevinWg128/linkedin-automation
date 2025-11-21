import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">LinkedIn Automation API</h1>

      <div className="flex gap-4">
        <Link
          href="/api/auth/linkedin"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Login with LinkedIn
        </Link>

        <Link
          href="/api/search?q=test"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Test Search API
        </Link>
      </div>
    </main>
  );
}
