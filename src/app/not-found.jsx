"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const NotFoundPage = () => {
  const pathname = usePathname(); // This is the current (broken) path
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    // Optional: Log the broken path for analytics
    console.log(`User hit a 404 at: ${pathname}`);

    // Create a timer to redirect to home
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    // Redirect when countdown hits 0
    const redirect = setTimeout(() => {
      router.push("/");
    }, 5000);

    return () => {
      clearInterval(timer);
      clearTimeout(redirect);
    };
  }, [router, pathname]);

  return (
    <main className="grid min-h-screen place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-indigo-600">404 Error</p>

        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Page not found
        </h1>

        {/* Displaying the "Last Pathname" */}
        <p className="mt-4 text-sm font-mono text-gray-500 bg-gray-100 p-2 rounded inline-block">
          The path "{pathname}" does not exist.
        </p>

        <p className="mt-6 text-base leading-7 text-gray-600">
          We’ll take you back home automatically in{" "}
          <span className="font-bold text-indigo-600">{countdown}s</span>...
        </p>

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
