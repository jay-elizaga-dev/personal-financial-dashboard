"use client";

import { signOut } from "next-auth/react";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";

export function SidebarNav() {
  return (
    <nav className="w-64 bg-white border-r border-gray-200 flex flex-col py-8 px-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-8 text-blue-700">Personal Finance</h2>
      <ul className="space-y-4 flex-1">
        <li>
          <a
            href="/"
            className="block px-4 py-2 rounded-lg font-semibold text-gray-700 hover:bg-blue-100 transition-colors"
          >
            Home
          </a>
        </li>
        <li>
          <a
            href="/transactions"
            className="block px-4 py-2 rounded-lg font-semibold text-gray-700 hover:bg-blue-100 transition-colors"
          >
            Transactions
          </a>
        </li>
        <li>
          <a
            href="/accounts"
            className="block px-4 py-2 rounded-lg font-semibold text-gray-700 hover:bg-blue-100 transition-colors"
          >
            Accounts
          </a>
        </li>
      </ul>
      <button
        onClick={() => signOut({ callbackUrl: "/login" })}
        className="flex items-center gap-2 w-full px-4 py-2 text-sm font-medium text-gray-700 hover:bg-red-50 rounded-lg border border-gray-300 transition"
      >
        <ArrowRightOnRectangleIcon className="w-4 h-4" />
        Sign Out
      </button>
    </nav>
  );
}
