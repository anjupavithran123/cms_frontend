import React, { useEffect, useState } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import { supabase } from "../lib/supabase";

export default function Contact() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("contacts")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.error("Error fetching contacts:", error);
    } else {
      setContacts(data);
    }
    setLoading(false);
  };

  return (
    <section id="contact" className="py-16 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Contact Information
        </h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : contacts.length === 0 ? (
          <p className="text-center text-gray-500">No contacts available.</p>
        ) : (
          <div className="space-y-6">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className="bg-white shadow-md rounded p-6 space-y-3"
              >
                <div className="flex items-center gap-3">
                  <Phone className="text-blue-600 w-5 h-5" />
                  <span>{contact.phone}</span>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="text-green-600 w-5 h-5" />
                  <span>{contact.email}</span>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="text-red-600 w-5 h-5" />
                  <span>{contact.place}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
