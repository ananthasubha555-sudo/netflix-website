import React from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#111] text-white">
      <div className="p-8 rounded bg-[#1f1f1f]">
        <h2 className="text-2xl font-bold mb-4">Welcome to the Dashboard</h2>
        <p className="mb-4">This is a dummy page after a successful login.</p>
        <Link to="/" className="text-red-500 underline">Logout</Link>
      </div>
    </div>
  );
}
