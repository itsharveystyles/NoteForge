import React from "react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center px-6 py-8">
      {/* Page Title */}
      <h1 className="text-4xl font-bold mb-6">Dashboard</h1>

      {/* Welcome Message */}
      <p className="text-gray-300 mb-8 text-center max-w-xl">
        Welcome back! Here’s where you can view and manage your notes.
      </p>

      {/* Placeholder for notes */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gray-800 p-4 rounded-lg shadow">Note 1</div>
        <div className="bg-gray-800 p-4 rounded-lg shadow">Note 2</div>
        <div className="bg-gray-800 p-4 rounded-lg shadow">Note 3</div>
      </div>

      {/* Footer spacing */}
      <div className="mt-auto mb-6 text-gray-500 text-sm">
        NoteForge &copy; {new Date().getFullYear()}
      </div>
    </div>
  );
};

export default Dashboard;