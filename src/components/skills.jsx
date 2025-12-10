import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Skills() {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchSkills = async () => {
      const { data, error } = await supabase
        .from("skills")
        .select("*")
        .order("id");

      if (error) return console.error(error);
      setSkills(data);
    };
    fetchSkills();
  }, []);

  if (!skills.length) return <p className="text-center py-6">Loading Skills...</p>;

  // Badge color based on proficiency level
  const getBadgeColor = (level) => {
    switch (level) {
      case "Expert":
        return "bg-green-100 text-green-800 border-green-300";
      case "Intermediate":
        return "bg-blue-100 text-blue-800 border-blue-300";
      default:
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
    }
  };

  return (
    <section id="skills" className="py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Skills</h2>

        <div className="flex flex-wrap justify-center gap-4">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="px-4 py-3 bg-white rounded shadow border flex flex-col items-center"
            >
              <span className="text-lg font-semibold">{skill.name}</span>

              <span
                className={`mt-1 px-2 py-1 text-sm rounded border ${getBadgeColor(
                  skill.proficiency
                )}`}
              >
                {skill.proficiency || "Beginner"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
