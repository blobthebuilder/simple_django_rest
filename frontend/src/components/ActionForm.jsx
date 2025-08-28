import React, { useState } from "react";
import { api } from "../api/axios";

const ActionForm = ({ onActionCreated }) => {
  const [form, setForm] = useState({ action: "", date: "", points: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/actions/", form);
      onActionCreated(response.data); // Refresh list
      setForm({ action: "", date: "", points: "" });
    } catch (error) {
      console.error("Error creating action:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow-md max-w-md mx-auto mb-6">
      <h2 className="text-xl font-bold mb-4">Add New Action</h2>
      <input
        name="action"
        placeholder="Action"
        value={form.action}
        onChange={handleChange}
        className="w-full mb-3 p-2 border border-gray-300 rounded placeholder-gray-400"
        required
      />
      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
        className="w-full mb-3 p-2 border border-gray-300 rounded placeholder-gray-400"
        required
      />
      <input
        type="number"
        name="points"
        placeholder="Points"
        value={form.points}
        onChange={handleChange}
        className="w-full mb-3 p-2 border border-gray-300 rounded placeholder-gray-400"
        required
      />
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
        Add Action
      </button>
    </form>
  );
};

export default ActionForm;
