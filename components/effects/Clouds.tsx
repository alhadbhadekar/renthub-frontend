"use client";

export default function CloudsEffect() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div className="absolute top-10 left-[-200px] w-[600px] h-[300px] bg-white opacity-20 rounded-full blur-3xl animate-clouds" />
      <div className="absolute top-[300px] left-[-300px] w-[700px] h-[350px] bg-white opacity-15 rounded-full blur-3xl animate-clouds-delayed" />
    </div>
  );
}
