// components/contact.jsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Contact() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch contacts from Supabase
  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .order('id', { ascending: true });

    if (error) {
      console.error('Error fetching contacts:', error);
    } else {
      setContacts(data);
    }
    setLoading(false);
  };

  return (
    <section id="contact" className="py-16 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Contact Information</h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : contacts.length === 0 ? (
          <p className="text-center text-gray-500">No contacts available.</p>
        ) : (
          <div className="space-y-6">
            {contacts.map((contact) => (
              <div key={contact.id} className="bg-white shadow-md rounded p-6 flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <div className="mb-2 sm:mb-0">
                  <p><strong>Phone:</strong> {contact.phone}</p>
                  <p><strong>Email:</strong> {contact.email}</p>
                  <p><strong>Place:</strong> {contact.place}</p>
                </div>
                <div>
                  {/* Optional: Add icons or action buttons here */}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
