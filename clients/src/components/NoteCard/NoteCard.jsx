import React from "react";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi2";

const NoteCard = ({ note, onEdit, onDelete }) => {
  if (!note || typeof note !== "object") return null;

  const { title, snippet, updatedAt, isPinned, tags } = note;
  const date = updatedAt
    ? new Date(updatedAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "";
  const tagList = Array.isArray(tags) ? tags : [];

  return (
    <article
      className="card-dark p-4 hover:bg-[var(--bg-card-hover)] transition-colors group cursor-pointer"
      onClick={() => onEdit?.(note)}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="font-semibold text-[var(--text-primary)] line-clamp-1 flex-1">
          {title || "Untitled Note"}
        </h3>
        {isPinned && (
          <span className="text-[var(--accent)] text-xs font-medium shrink-0">
            Pinned
          </span>
        )}
      </div>
      {(snippet || note.content) && (
        <p className="text-sm text-[var(--text-secondary)] line-clamp-2 mb-3">
          {snippet || (note.content || "").slice(0, 120)}
        </p>
      )}
      {tagList.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {tagList.map((t, i) => {
            const label = typeof t === "string" ? t : (t && t.label);
            if (!label) return null;
            return (
              <span
                key={`${label}-${i}`}
                className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-[var(--accent-muted)] text-[var(--accent)]"
              >
                {label}
              </span>
            );
          })}
        </div>
      )}
      <div className="flex items-center justify-between">
        <span className="text-xs text-[var(--text-muted)]">{date}</span>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onEdit?.(note);
            }}
            className="p-1.5 rounded-md text-[var(--text-muted)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--accent)]"
            aria-label="Edit note"
          >
            <HiOutlinePencil className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.(note);
            }}
            className="p-1.5 rounded-md text-[var(--text-muted)] hover:bg-red-500/20 hover:text-red-400"
            aria-label="Delete note"
          >
            <HiOutlineTrash className="w-4 h-4" />
          </button>
        </div>
      </div>
    </article>
  );
};

export default NoteCard;
