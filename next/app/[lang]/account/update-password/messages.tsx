"use client";

import { useSearchParams } from "next/navigation";

export default function Messages({
  message,
  error,
}: {
  message?: string;
  error?: string;
}) {
  return (
    <>
      {error && (
        <p className="mt-3 rounded-md border border-red-300 bg-red-200 p-4 text-center text-sm text-gray-800">
          {error}
        </p>
      )}
      {message && (
        <p className="mt-3 rounded-md border border-green-300 bg-green-200 p-4 text-center text-sm text-gray-800">
          {message}
        </p>
      )}
    </>
  );
}
