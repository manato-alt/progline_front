import React from "react";

export default function Loading() {
  return (
    <div className="flex justify-center h-[92vh] pt-40 bg-[#f7f9fb] px-8">
      <div className="w-16 h-16 border-4 border-cyan-500 border-dotted rounded-full animate-spin"></div>
    </div>
  );
}
