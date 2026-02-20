import React from "react";
import { HiPlus } from "react-icons/hi2";

const CreateNoteButton = ({ onClick, label = "New note", variant = "primary" }) => {
  const isFloating = variant === "floating";

  return (
    <button
      type="button"
      onClick={onClick}
      className={
        isFloating
          ? "btn-glow fixed bottom-8 right-8 w-14 h-14 rounded-full bg-[var(--accent)] text-white shadow-lg hover:bg-[var(--accent-hover)] transition-all hover:scale-105 flex items-center justify-center z-20"
          : "btn-glow inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[var(--accent)] text-white font-medium hover:bg-[var(--accent-hover)] transition-colors"
      }
      aria-label={label}
    >
      <HiPlus className="w-5 h-5 shrink-0" />
      {!isFloating && <span>{label}</span>}
    </button>
  );
};

export default CreateNoteButton;
