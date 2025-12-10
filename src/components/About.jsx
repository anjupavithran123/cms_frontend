import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function About() {
  const [about, setAbout] = useState(null);

  useEffect(() => {
    const fetchAbout = async () => {
      const { data, error } = await supabase
        .from("about")
        .select("name, content, phone, resume, photo")
        .order("id")
        .limit(1);

      if (error) {
        console.error(error);
        return;
      }

      setAbout(data[0]);
    };

    fetchAbout();
  }, []);

  if (!about) return <p className="text-center py-6">Loading About...</p>;

  return (
    <section id="about" className="py-12 bg-white text-center">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">About</h2>

      <h2 className="text-3xl font-bold mb-4">{about.name}</h2>
      <p className="text-gray-700 mb-2">{about.content}</p>
      <p className="text-gray-500 mb-2">Phone: {about.phone}</p>
      {about.photo && (
        <img
          src={about.photo}
          alt={about.name}
          className="mx-auto rounded w-48 h-48 object-cover mb-2"
        />
      )}
      {about.resume && (
        <a
          href={about.resume}
          target="_blank"
          className="text-blue-600 underline"
        >
          Download Resume
        </a>
      )}
      </div>
    </section>
  );
}
