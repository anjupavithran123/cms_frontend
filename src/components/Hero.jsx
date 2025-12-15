import React, { useEffect, useState } from "react";
import { Download } from "lucide-react";
import { supabase } from "../lib/supabase";

export default function Hero() {
  const [about, setAbout] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");

  useEffect(() => {
    const fetchAbout = async () => {
      const { data, error } = await supabase
        .from("about")
        .select("name, photo, resume")
        .order("id")
        .limit(1);

      if (error) {
        console.error("Error fetching About data:", error);
        return;
      }

      const aboutData = data[0];
      setAbout(aboutData);

      /** Avatar */
      if (aboutData.photo) {
        if (aboutData.photo.startsWith("http")) {
          setAvatarUrl(aboutData.photo);
        } else {
          const { data: urlData } = supabase.storage
            .from("avatars")
            .getPublicUrl(aboutData.photo);
          setAvatarUrl(urlData.publicUrl);
        }
      }

      /** Resume */
      if (aboutData.resume) {
        if (aboutData.resume.startsWith("http")) {
          setResumeUrl(aboutData.resume);
        } else {
          const { data: resumeData } = supabase.storage
            .from("resumes")
            .getPublicUrl(aboutData.resume);

          setResumeUrl(resumeData.publicUrl);
        }
      }
    };

    fetchAbout();
  }, []);

  return (
    <section id="home" className="pt-10 pb-10 md:pt-12 md:pb-24 flex flex-col md:flex-row items-center justify-between min-h-[70vh]">
      <div className="md:w-3/5 text-center md:text-left mb-10 md:mb-0">
        <p className="text-lg font-semibold text-indigo-500 uppercase tracking-wider mb-3">
          Hello, I'm
        </p>

        <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 leading-tight">
          {about?.name || "Anju"} <span className="text-indigo-600"></span>
        </h1>

        <p className="mt-4 text-2xl text-gray-600 max-w-lg mx-auto md:mx-0">
          Full Stack Developer • CMS Builder • Portfolio Designer
        </p>

        <div className="mt-8 flex justify-center md:justify-start space-x-4">
          <a
            href={resumeUrl || "#"}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-3 text-lg font-medium rounded-full text-white bg-indigo-600 shadow-xl hover:bg-indigo-700 transition duration-300 transform hover:scale-105"
          >
           <Download className="w-5 h-5 mr-2" />

            Download Resume
          </a>
          
        </div>
      </div>

      {/* Avatar */}
      <div className="md:w-2/5 flex justify-center">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={about?.name || "Profile"}
            className="w-64 h-64 md:w-80 md:h-80 rounded-full shadow-2xl object-cover border-4 border-indigo-200"
          />
        ) : (
          <div className="w-64 h-64 md:w-80 md:h-80 bg-gray-200 rounded-full shadow-2xl flex items-center justify-center text-gray-700 text-xl font-bold border-4 border-indigo-200">
            Loading...
          </div>
        )}
      </div>
    </section>
  );
}
