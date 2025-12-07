"use client";

import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="max-w-lg mx-auto px-4 py-24">
      <div
        className="
          bg-white/10
          backdrop-blur-md
          border border-white/20
          rounded-2xl
          p-10
          shadow-2xl
          text-white
        "
      >
        {/* TITLE */}
        <h1 className="text-4xl font-bold mb-6 text-center">Create Account</h1>

        {/* FORM */}
        <form className="flex flex-col gap-5">
          {/* INPUTS */}
          <input
            placeholder="Full Name"
            className="
              p-3 rounded-lg bg-white/20 border border-white/30 
              placeholder-white/60 text-white
            "
          />

          <input
            type="email"
            placeholder="Email"
            className="
              p-3 rounded-lg bg-white/20 border border-white/30 
              placeholder-white/60 text-white
            "
          />

          <input
            type="password"
            placeholder="Password"
            className="
              p-3 rounded-lg bg-white/20 border border-white/30 
              placeholder-white/60 text-white
            "
          />

          {/* LEGAL CONSENTS */}
          <div className="flex flex-col gap-4 text-sm text-white/80">
            <label className="flex gap-3 items-start">
              <input type="checkbox" required className="mt-1" />
              <span>
                I agree to the{" "}
                <Link href="/legal/terms" className="underline">Terms</Link>{" "}
                and{" "}
                <Link href="/legal/privacy" className="underline">Privacy Policy</Link>.
              </span>
            </label>

            <label className="flex gap-3 items-start">
              <input type="checkbox" className="mt-1" />
              <span>
                I agree to receive product updates, news, and marketing emails (optional).
              </span>
            </label>
          </div>

          {/* SUBMIT BUTTON */}
          <button
            className="
              bg-white text-black 
              rounded-lg py-3 mt-2
              font-semibold 
              hover:bg-gray-200 transition
            "
          >
            Sign Up
          </button>
        </form>

        {/* ALREADY ACCOUNT */}
        <p className="text-center text-white/70 text-sm mt-6">
          Already have an account?{" "}
          <Link href="/login" className="underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
