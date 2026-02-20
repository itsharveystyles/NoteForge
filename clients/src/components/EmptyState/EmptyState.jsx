import React from "react";
import { HiOutlineDocumentPlus } from "react-icons/hi2";

const EmptyState = ({ title = "No notes yet", message = "Create your first note to get started.", onAction, actionLabel = "Create note" }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="w-20 h-20 rounded-2xl bg-[var(--accent-muted)] flex items-center justify-center mb-6">
        <HiOutlineDocumentPlus className="w-10 h-10 text-[var(--accent)]" />
      </div>
      <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">{title}</h3>
      <p className="text-[var(--text-secondary)] max-w-sm mb-8">{message}</p>
      {onAction && (
        <button
          type="button"
          onClick={onAction}
          className="btn-glow px-6 py-3 rounded-lg bg-[var(--accent)] text-white font-medium hover:bg-[var(--accent-hover)] transition-colors"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
