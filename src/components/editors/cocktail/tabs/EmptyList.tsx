import React, { ReactNode } from "react";

export default function EmptyList({ children }: { children: ReactNode }) {
  return (
    <span className="block w-full text-center text-gray-600 text-xs rounded-md border p-4 dark:text-gray-400">
      {children}
    </span>
  );
}