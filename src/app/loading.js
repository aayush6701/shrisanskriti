"use client";
import { useEffect, useState } from "react";

export default function Loading() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Hide loader after 1 second minimum
    const timer = setTimeout(() => setShow(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center 
      bg-white/30 backdrop-blur-md z-50">
      <div className="h-20 w-20 border-4 border-purple-600 border-t-transparent 
        rounded-full animate-spin shadow-lg"></div>
    </div>
  );
}
