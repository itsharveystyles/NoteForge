import React from "react";

const Footer = () => {
  return (
    <footer className="text-[var(--text-muted)] py-6 px-10 mt-auto bg-[var(--bg-secondary)] border-t border-[var(--border-subtle)]">
      <div className="flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto">
        <div className="text-[var(--text-primary)] font-semibold text-lg mb-4 md:mb-0">
          NoteForge
        </div>
        <div className="flex space-x-6 mb-4 md:mb-0">
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--text-link-hover)] transition"
          >
            Twitter
          </a>
          <a
            href="https://facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--text-link-hover)] transition"
          >
            Facebook
          </a>
          <a
            href="https://linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--text-link-hover)] transition"
          >
            LinkedIn
          </a>
        </div>
        <div className="text-sm text-[var(--text-muted)]">
          &copy; {new Date().getFullYear()} NoteForge. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;
