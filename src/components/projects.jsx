import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("id");

      if (error) return console.error(error);
      setProjects(data);
    };

    fetchProjects();
  }, []);

  if (!projects.length)
    return <p className="text-center py-6">Loading Projects...</p>;

  return (
    <section id="projects" className="py-12 bg-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Projects</h2>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="border p-4 rounded shadow hover:shadow-lg transition text-left"
            >
              <h3 className="text-xl font-semibold">{project.title}</h3>

              <p className="text-gray-700 mt-2">{project.description}</p>

              {/* ✅ PROJECT LINK SHOWN HERE */}
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-3 text-blue-600 underline font-medium"
                >
                  View Project →
                </a>
              )}

              {project.image && (
                <img
                  src={project.image}
                  alt={project.title}
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
