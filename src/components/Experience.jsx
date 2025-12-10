import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

// ✅ Function to calculate duration (Years + Months)
function calculateDuration(startDate, endDate) {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();

  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();

  // Adjust if month difference is negative
  if (months < 0) {
    years--;
    months += 12;
  }

  // Format final output
  return `${years} yr ${months} mo`;
}

export default function Experience() {
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    const fetchExperience = async () => {
      const { data, error } = await supabase
        .from("experience")
        .select("*")
        .order("startDate", { ascending: false }); // Fetch latest first

      if (error) return console.error(error);
      setExperiences(data || []);
    };

    fetchExperience();
  }, []);

  if (!experiences.length)
    return <p className="text-center py-6">Loading Experience...</p>;

  return (
    <section id="experience" className="py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6">Experience</h2>

        <div className="flex flex-col gap-6">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="border-l-4 border-blue-600 pl-4"
            >
              {/* ROLE + COMPANY */}
              <h3 className="text-xl font-semibold">
                {exp.role} @ {exp.company}
              </h3>

              {/* LOCATION */}
              {exp.location && (
                <p className="text-sm text-gray-500">{exp.location}</p>
              )}

              {/* DATES + Duration */}
              <span className="text-gray-500 text-sm">
                {exp.startDate} - {exp.endDate || "Present"} (
                {calculateDuration(exp.startDate, exp.endDate)})
              </span>

              {/* DESCRIPTION */}
              <p className="text-gray-700 mt-2">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
