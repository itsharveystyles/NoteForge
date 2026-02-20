import React, { useState, useMemo } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import NoteCard from "../../components/NoteCard/NoteCard";
import StatsCard from "../../components/StatsCard/StatsCard";
import SearchBar from "../../components/SearchBar/SearchBar";
import EmptyState from "../../components/EmptyState/EmptyState";
import CreateNoteButton from "../../components/CreateNoteButton/CreateNoteButton";
import { HiOutlineDocumentText, HiOutlineClock } from "react-icons/hi2";

const MOCK_NOTES = [
  { id: "1", title: "Meeting notes", snippet: "Action items: review API, update docs, schedule follow-up.", updatedAt: new Date().toISOString(), isPinned: true },
  { id: "2", title: "Ideas for NoteForge", snippet: "Dark theme, markdown support, tags, and search.", updatedAt: new Date(Date.now() - 86400000).toISOString(), isPinned: false },
  { id: "3", title: "Untitled Note", snippet: "", updatedAt: new Date(Date.now() - 172800000).toISOString(), isPinned: false },
];

const Dashboard = () => {
  const [notes, setNotes] = useState(MOCK_NOTES);
  const [search, setSearch] = useState("");

  const filteredNotes = useMemo(() => {
    if (!search.trim()) return notes;
    const q = search.toLowerCase();
    return notes.filter(
      (n) =>
        (n.title || "").toLowerCase().includes(q) ||
        (n.snippet || "").toLowerCase().includes(q)
    );
  }, [notes, search]);

  const handleCreateNote = () => {
    setNotes((prev) => [
      { id: String(Date.now()), title: "New note", snippet: "", updatedAt: new Date().toISOString(), isPinned: false },
      ...prev,
    ]);
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
          {/* Header */}
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
                <SearchBar value={search} onChange={setSearch} />
              </div>
              <CreateNoteButton onClick={handleCreateNote} label="New note" />
            </div>
          </div>

          {/* Stats */}
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

          {/* Notes grid or empty state */}
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
                    onEdit={() => {}}
                    onDelete={handleDeleteNote}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                title={search ? "No matching notes" : "No notes yet"}
                message={
                  search
                    ? "Try a different search or create a new note."
                    : "Create your first note to get started."
                }
                onAction={search ? undefined : handleCreateNote}
                actionLabel="Create note"
              />
            )}
          </section>
        </div>
      </main>
      <CreateNoteButton onClick={handleCreateNote} variant="floating" />
    </div>
  );
};

export default Dashboard;
