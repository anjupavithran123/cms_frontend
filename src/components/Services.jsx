import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      const { data, error } = await supabase.from("services").select("*").order("id", { ascending: true });
      if (error) return console.error(error);
      setServices(data);
    };
    fetchServices();
  }, []);

  if (!services.length) return <p className="text-center py-6">Loading Services...</p>;

  return (
    <section id="services" className="py-12 bg-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Services</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {services.map(service => (
            <div key={service.id} className="p-4 border rounded shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-700">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

