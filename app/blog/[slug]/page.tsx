import { notFound } from "next/navigation";
import Link from "next/link";

// ✅ TYPES
type Blog = {
  id: number;
  slug: string;
  title: string;
  description: string;
  date: string;
  image: string;
  content: string;
};

// ✅ FETCH ALL BLOGS (STATIC PARAMS)
async function getAllBlogs(): Promise<Blog[]> {
  const res = await fetch("http://localhost:8080/blogs", {
    cache: "no-store",
  });

  if (!res.ok) return [];
  return res.json();
}

// ✅ FETCH BLOG BY SLUG
async function getBlogBySlug(slug: string): Promise<Blog | null> {
  const res = await fetch(`http://localhost:8080/blogs/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;
  return res.json();
}

// ✅ STATIC PARAMS — ✅ FIXED FOR NEXT 16
export async function generateStaticParams() {
  const blogs = await getAllBlogs();
  return blogs.map((post) => ({ slug: post.slug }));
}

// ✅ METADATA — ✅ FIXED FOR NEXT 16
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // ✅ MUST AWAIT

  const post = await getBlogBySlug(slug);

  if (!post) {
    return {
      title: "Blog Not Found | RentHub",
      description: "The blog you're looking for doesn't exist.",
    };
  }

  return {
    title: post.title + " | RentHub Blog",
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: [post.image],
    },
  };
}

// ✅ PAGE — ✅ FIXED FOR NEXT 16
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // ✅ MUST AWAIT

  const post = await getBlogBySlug(slug);

  if (!post) return notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 py-20 text-white">

      {/* ✅ BACK TO BLOGS */}
      <Link
        href="/blog"
        className="
          inline-block mb-6
          px-4 py-2 rounded-lg
          bg-white/10 backdrop-blur-md
          border border-white/30
          hover:bg-white/20 transition
          text-white
        "
      >
        ← Back to Blogs
      </Link>

      <div
        className="
          bg-white/10 
          backdrop-blur-md 
          border border-white/20
          rounded-2xl 
          p-8 
          shadow-xl
          text-white
        "
      >
        <img
          src={post.image}
          className="w-full aspect-[16/9] object-cover rounded-lg mb-8"
        />

        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-400 mb-8">{post.date}</p>

        <article className="prose prose-invert max-w-none">
          <div
            dangerouslySetInnerHTML={{
              __html: post.content.replace(/\n/g, "<br/>"),
            }}
          />
        </article>
      </div>
    </div>
  );
}
