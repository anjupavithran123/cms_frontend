import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")

        .order("id", { ascending: true });

      if (error) return console.error(error);
      setTestimonials(data || []);
    };

    fetchTestimonials();
  }, []);

  if (!testimonials.length)
    return <p className="text-center py-6">Loading Testimonials...</p>;

  return (
    <section id="testimonials" className="py-12 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Testimonials</h2>

        <div className="flex flex-col gap-6">
          {testimonials.map((item) => (
            <div key={item.id} className="p-4 border rounded shadow">
              
              {/* ✅ MESSAGE (not feedback) */}
              <p className="text-gray-700 italic">
                "{item.message}"
              </p>

              {/* ✅ NAME */}
              <h4 className="mt-3 font-semibold">{item.name}</h4>

              {/* ✅ POSITION (not role) */}
              {item.position && (
                <span className="text-gray-500 text-sm">
                  {item.position}
                </span>
              )}

              {/* ✅ STAR RATING */}
              <div className="mt-2 flex justify-center gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <span
                    key={n}
                    className={
                      n <= item.rating ? "text-yellow-400" : "text-gray-300"
                    }
                  >
                    ★
                  </span>
                ))}
              </div>

              {/* ✅ IMAGE */}
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  className="mx-auto mt-4 w-20 h-20 rounded-full object-cover"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
