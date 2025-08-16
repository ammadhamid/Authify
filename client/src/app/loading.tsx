
import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50">
      <LoaderCircle className="h-12 w-12 animate-spin text-purple-600" />
    </div>
  );
}