"use client";

import { Separator } from "../ui/separator";

export default function SeperatorLines() {
  return (
    <div className="flex flex-row items-center gap-3 my-2">
      <Separator className="flex-1 h-[2px] bg-gray-200 border-0" />
      <span className="text-sm font-semibold text-gray-500">OR</span>
      <Separator className="flex-1 h-[2px] bg-gray-200 border-0" />
    </div>
  );
}
