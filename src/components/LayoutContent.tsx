"use client";

import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SidebarNav } from "./SidebarNav";

export function LayoutContent({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  const isLoginPage = pathname === "/login";
  const isLoading = status === "loading";
  const isAuthenticated = !!session;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || isLoading) return;

    if (!isAuthenticated && !isLoginPage) {
      router.push("/login");
    }

    if (isAuthenticated && isLoginPage) {
      router.push("/");
    }
  }, [mounted, isLoading, isAuthenticated, isLoginPage, router]);

  // Show loading state during hydration or session check
  if (!mounted || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Login page doesn't need sidebar
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Redirect will happen in useEffect, but show loading while redirect processes
  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  // Only show authenticated content with sidebar
  return (
    <div className="flex min-h-screen">
      <SidebarNav />
      <div className="flex-1 p-8">{children}</div>
    </div>
  );
}
