"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center px-4 py-24 min-h-[60vh]">
      
      <div
        className="
          w-full max-w-sm 
          bg-white/10 backdrop-blur-md
          rounded-2xl p-8 shadow-xl
          border border-white/20
          text-white
        "
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => signIn("google")}
            className="w-full py-2 bg-white text-black rounded-lg shadow-md flex items-center justify-center gap-2 hover:bg-gray-100 transition"
          >
            <img src="/google.svg" className="w-5 h-5" />
            Continue with Google
          </button>

          <button
            onClick={() => signIn("facebook")}
            className="w-full py-2 bg-[#1877F2] text-white rounded-lg shadow-md flex items-center justify-center gap-2 hover:bg-[#1666d0] transition"
          >
            <img src="/facebook.svg" className="w-5 h-5" />
            Continue with Facebook
          </button>
        </div>

        <p className="text-center text-white/80 text-sm mt-6">
          Don’t have an account?{" "}
          <Link href="/signup" className="underline">
            Sign up
          </Link>
        </p>
      </div>

    </div>
  );
}
