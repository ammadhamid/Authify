// components/ProgressBar.tsx

"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import NProgress from "nprogress";

export function ProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    NProgress.configure({ showSpinner: true });

    NProgress.start();

    return () => {
      NProgress.done();
    };
  }, [pathname, searchParams]); 
  return null;
}