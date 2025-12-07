"use client";

import Image from "next/image";

export default function ProfileCard() {
  return (
    <div className="bg-white rounded-xl shadow p-6 text-center space-y-4">
      <div className="relative w-32 h-32 mx-auto">
        <Image
          src="/avatar.png"
          fill
          className="rounded-full object-cover"
          alt="avatar"
        />
      </div>

      <div>
        <h2 className="text-xl font-bold">John Doe</h2>
        <p className="text-gray-500">New York, USA</p>
      </div>

      <div className="flex justify-center gap-4">
        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
          ✅ Verified
        </span>
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
          User Account
        </span>
      </div>

      <div className="flex justify-center gap-6 pt-4">
        <div>
          <p className="font-bold">24</p>
          <p className="text-sm text-gray-500">Rentals</p>
        </div>
        <div>
          <p className="font-bold">⭐ 4.8</p>
          <p className="text-sm text-gray-500">Rating</p>
        </div>
      </div>
    </div>
  );
}
