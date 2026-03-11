"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const NotFoundPage = () => {
  const pathname = usePathname(); // This is the current (broken) path
  const router = useRouter();

  return (
    <main className="grid min-h-screen place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-indigo-600">404 Error</p>

        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Page not found
        </h1>

        <div className="mt-10 flex items-center justify-center gap-x-6">
          <button
            onClick={() => router.push("/")}
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
          >
            Redirect Now
          </button>
          <Link
            href="/support"
            className="text-sm font-semibold text-gray-900 hover:text-indigo-600"
          >
            Report an issue <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotFoundPage;
