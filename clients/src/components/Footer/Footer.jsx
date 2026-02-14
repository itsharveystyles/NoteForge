import React from "react";

const Footer = () => {
  return (
    <footer className="text-gray-400 py-6 px-10 mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto">

        {/* Logo / Brand */}
        <div className="text-white font-semibold text-lg mb-4 md:mb-0">
          NoteForge
        </div>

        {/* Social Media Links */}
        <div className="flex space-x-6 mb-4 md:mb-0">
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
          >
            Twitter
          </a>
          <a
            href="https://facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
          >
            Facebook
          </a>
          <a
            href="https://linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
          >
            LinkedIn
          </a>
        </div>

        {/* Copyright */}
        <div className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} NoteForge. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;
