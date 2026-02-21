import React, { useState, useMemo, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import NoteCard from "../../components/NoteCard/NoteCard";
import StatsCard from "../../components/StatsCard/StatsCard";
import SearchBar from "../../components/SearchBar/SearchBar";
import EmptyState from "../../components/EmptyState/EmptyState";
import CreateNoteButton from "../../components/CreateNoteButton/CreateNoteButton";
import NoteEditorModal from "../../components/NoteEditorModal/NoteEditorModal";
import { HiOutlineDocumentText, HiOutlineClock } from "react-icons/hi2";

const STORAGE_KEY = "noteforge-notes";

const loadNotes = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const data = JSON.parse(raw);
    if (!Array.isArray(data)) return [];
    return data.filter((n) => n != null && typeof n === "object");
  } catch {
    return [];
  }
};

const saveNotes = (notes) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  } catch (_) {}
};

const Dashboard = () => {
  const [notes, setNotes] = useState(loadNotes);
  const [search, setSearch] = useState("");
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  const filteredNotes = useMemo(() => {
    let list = notes;
    if (search.trim()) {
      const q = search.toLowerCase();
      list = notes.filter(
        (n) =>
          (n.title || "").toLowerCase().includes(q) ||
          (n.snippet || "").toLowerCase().includes(q) ||
          (n.content || "").toLowerCase().includes(q) ||
          (Array.isArray(n.tags) &&
            n.tags.some((t) => {
              const label = typeof t === "string" ? t : (t && t.label);
              return (label || "").toLowerCase().includes(q);
            }))
      );
    }
    return [...list].sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    });
  }, [notes, search]);

  const handleCreateNote = () => {
    setEditingNote(null);
    setEditorOpen(true);
  };

  const handleEditNote = (note) => {
    setEditingNote(note);
    setEditorOpen(true);
  };

  const handleSaveNote = (payload) => {
    setNotes((prev) => {
      const idx = prev.findIndex((n) => n.id === payload.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = payload;
        return next;
      }
      return [payload, ...prev];
    });
    setEditorOpen(false);
    setEditingNote(null);
  };

  const handleDeleteNote = (note) => {
    setNotes((prev) => prev.filter((n) => n.id !== note.id));
  };

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="flex min-h-[calc(100vh-8rem)] bg-[var(--bg-primary)]">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold text-[var(--text-primary)]">
                {greeting()}
              </h1>
              <p className="text-[var(--text-muted)] text-sm mt-0.5">
                Here’s your notes at a glance.
              </p>
            </div>
            <div className="flex gap-3 items-center">
              <div className="flex-1 sm:max-w-xs">
                <SearchBar value={search} onChange={setSearch} placeholder="Search notes or tags..." />
              </div>
              <CreateNoteButton onClick={handleCreateNote} label="New note" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <StatsCard
              label="Total notes"
              value={notes.length}
              icon={HiOutlineDocumentText}
              accent
            />
            <StatsCard
              label="Updated recently"
              value={notes.filter((n) => {
                const d = new Date(n.updatedAt);
                return Date.now() - d.getTime() < 7 * 24 * 60 * 60 * 1000;
              }).length}
              icon={HiOutlineClock}
            />
          </div>

          <section>
            <h2 className="text-sm font-medium text-[var(--text-muted)] uppercase tracking-wider mb-4">
              {filteredNotes.length ? "Your notes" : "Notes"}
            </h2>
            {filteredNotes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredNotes.map((note) => (
                  <NoteCard
                    key={note.id}
                    note={note}
                    onEdit={handleEditNote}
                    onDelete={handleDeleteNote}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                title={search ? "No matching notes" : "You don't have any notes yet"}
                message={
                  search
                    ? "Try a different search or create a new note."
                    : "Create your first note to capture your ideas. Click the button below to get started."
                }
                onAction={search ? undefined : handleCreateNote}
                actionLabel="Create your first note"
              />
            )}
          </section>
        </div>
      </main>
      <CreateNoteButton onClick={handleCreateNote} variant="floating" />

      <NoteEditorModal
        open={editorOpen}
        onClose={() => {
          setEditorOpen(false);
          setEditingNote(null);
        }}
        note={editingNote}
        onSave={handleSaveNote}
      />
    </div>
  );
};

export default Dashboard;
