"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

// ✅ TYPE MATCHING YOUR GO API
type Blog = {
  id: number;
  slug: string;
  title: string;
  description: string;
  date: string;
  image: string;
  content: string;
};

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ FETCH BLOGS FROM GO API
  useEffect(() => {
    fetch("http://localhost:8080/blogs")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setBlogs(data);
        else setBlogs([]);
        setLoading(false);
      })
      .catch(() => {
        setBlogs([]);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
         {/* ✅ SMALLER HEADER */}
         <h2 className="text-4xl text-white mb-3">Blog</h2>
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
       

        {/* ✅ LOADING */}
        {loading && (
          <p className="text-white/70 text-center mb-12 text-sm">
            Loading blogs...
          </p>
        )}

        {/* ✅ SINGLE COLUMN BLOG LIST (SMALLER FONTS) */}
        {!loading && (
          <div className="flex flex-col gap-8 mb-16">
            {blogs.length > 0 ? (
              blogs.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="
                    flex flex-col md:flex-row
                    bg-white/15 
                    backdrop-blur-md 
                    rounded-2xl 
                    overflow-hidden 
                    border border-white/20 
                    hover:border-white/40 
                    hover:shadow-xl
                    transition-all duration-300
                  "
                >
                  {/* ✅ IMAGE */}
                  <img
                    src={post.image}
                    className="w-full md:w-[380px] h-[240px] object-cover"
                  />

                  {/* ✅ CONTENT */}
                  <div className="p-6 flex flex-col justify-between">
                    <div>
                      <h2 className="text-xl font-semibold">
                        {post.title}
                      </h2>

                      <p className="text-gray-300 mt-3 text-sm leading-relaxed">
                        {post.description}
                      </p>
                    </div>

                    <p className="text-xs text-gray-400 mt-5">
                      {post.date}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-white/70 text-center text-sm">
                No blog posts available yet.
              </p>
            )}
          </div>
        )}

        {/* ⭐ SUBSCRIBE SECTION (SMALLER TEXT) */}
        <div
          className="
            bg-white/10 
            backdrop-blur-lg 
            border border-white/20 
            rounded-2xl 
            p-8 
            shadow-xl
            text-white
          "
        >
          <h2 className="text-2xl font-bold mb-3">
            Subscribe to our Newsletter
          </h2>

          <p className="text-white/70 mb-5 text-sm">
            Get updates on new listings, blog posts, and exclusive offers.
          </p>

          <form className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Your email address"
              className="
                flex-1
                p-3
                rounded-lg 
                bg-white/20 
                border border-white/30 
                text-sm
                text-white 
                placeholder-white/60
              "
            />

            <button
              type="submit"
              className="
                px-6 py-3
                bg-white text-black 
                rounded-lg 
                font-semibold 
                text-sm
                hover:bg-gray-200 
                transition
              "
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
