import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="
        fixed bottom-0 left-0 w-full
        bg-white/10 backdrop-blur-md
        border-t border-white/20
        shadow-xl
        z-[50]
      "
    >
      <div className="max-w-5xl mx-auto px-6 py-4 text-white">

        {/* EMAIL SUBSCRIBE */}
        <div className="mb-4">
          <p className="text-white/80 mb-2 text-center text-sm">
            Subscribe for updates, blog posts, and special offers
          </p>

          <form className="flex flex-col sm:flex-row gap-3 justify-center">
            <input
              type="email"
              placeholder="Your email"
              className="
                p-2 rounded-lg bg-white/20 border border-white/30 text-white 
                placeholder-white/60 w-full sm:w-64
              "
            />
            <button
              type="submit"
              className="
                bg-white text-black px-4 py-2 rounded-lg 
                font-semibold hover:bg-gray-200 transition text-sm
              "
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* LEGAL LINKS */}
        <div className="flex flex-wrap justify-center gap-6 text-white/60 text-xs mb-3">
          <Link href="/legal/terms" className="hover:text-white transition">
            Terms
          </Link>
          <Link href="/legal/privacy" className="hover:text-white transition">
            Privacy
          </Link>
          <Link href="/legal/cookies" className="hover:text-white transition">
            Cookies
          </Link>
          <Link href="/legal/refunds" className="hover:text-white transition">
            Refunds
          </Link>
          <Link
            href="/legal/lister-agreement"
            className="hover:text-white transition"
          >
            Lister Agreement
          </Link>
        </div>

        {/* COPYRIGHT */}
        <p className="text-center text-white/50 text-xs">
          © {new Date().getFullYear()} RentHub. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
