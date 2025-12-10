import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .order("id", { ascending: false });

      if (error) {
        console.error(error);
      } else {
        setBlogs(data);
      }
    };

    fetchBlogs();
  }, []);

  if (!blogs.length)
    return <p className="text-center py-6">Loading Blogs...</p>;

  // Badge color for category
  const getCategoryColor = (c) => {
    switch (c?.toLowerCase()) {
      case "tech":
        return "bg-blue-100 text-blue-800";
      case "design":
        return "bg-purple-100 text-purple-800";
      case "tutorial":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  return (
    <section id="blogs" className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Blog</h2>

        <div className="grid md:grid-cols-2 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="border p-4 rounded shadow hover:shadow-lg transition text-left"
            >
              {/* TITLE */}
              <h3 className="text-xl font-semibold">{blog.title}</h3>

              {/* CATEGORY */}
              {blog.category && (
                <span
                  className={`inline-block mt-2 px-3 py-1 text-xs font-medium rounded ${getCategoryColor(
                    blog.category
                  )}`}
                >
                  {blog.category}
                </span>
              )}

              {/* CONTENT */}
              <p className="text-gray-700 mt-3 line-clamp-3">{blog.content}</p>

              {/* COVER IMAGE */}
              {blog.coverimage && (
                <img
                  src={blog.coverimage}
                  alt={blog.title}
                  className="mt-4 rounded w-full h-48 object-cover"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
