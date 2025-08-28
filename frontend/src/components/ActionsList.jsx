import React, { useState, useEffect } from "react";
import { api } from "../api/axios";
import { FaRegEdit } from "react-icons/fa";

const ActionsList = ({ refreshKey }) => {
  const [actions, setActions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActions();
  }, [refreshKey]);

  const fetchActions = async () => {
    try {
      const response = await api.get("/actions/");
      setActions(response.data);
    } catch (error) {
      console.error("Error fetching actions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/actions/${id}/`);
      setActions(actions.filter((a) => a.id !== id));
    } catch (error) {
      console.error("Error deleting action:", error);
    }
  };

  const handleEdit = async (id, field, value) => {
    try {
      const response = await api.patch(`/actions/${id}/`, { [field]: value });
      setActions(actions.map((a) => (a.id === id ? response.data : a)));
    } catch (error) {
      console.error("Error updating action:", error);
    }
  };

  if (loading) return <p className="text-center mt-6">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Sustainability Actions
      </h2>
      <ul className="space-y-3">
        {actions.map((action) => (
          <li
            key={action.id}
            className="flex justify-between items-center bg-white p-4 rounded shadow">
            <div>
              <div className="flex space-x-4">
                <EditableField
                  label="Action"
                  value={action.action}
                  onSave={(val) => handleEdit(action.id, "action", val)}
                />
                <div className="flex items-center">
                  <FaRegEdit />
                </div>
              </div>
              <EditableField
                label="Date"
                value={action.date}
                type="date"
                onSave={(val) => handleEdit(action.id, "date", val)}
              />
              <EditableField
                label="Points"
                value={action.points}
                type="number"
                onSave={(val) => handleEdit(action.id, "points", val)}
              />
            </div>
            <button
              onClick={() => handleDelete(action.id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Inline editable field component
const EditableField = ({ label, value, type = "text", onSave }) => {
  const [editing, setEditing] = React.useState(false);
  const [current, setCurrent] = React.useState(value);

  const save = () => {
    setEditing(false);
    if (current !== value) onSave(current);
  };

  return (
    <div className="mb-1">
      <span className="font-semibold">{label}: </span>
      {editing ? (
        <input
          type={type}
          value={current}
          onChange={(e) => setCurrent(e.target.value)}
          onBlur={save}
          onKeyDown={(e) => e.key === "Enter" && save()}
          className="border border-gray-300 rounded p-1"
          autoFocus
        />
      ) : (
        <span
          onClick={() => setEditing(true)}
          className="cursor-pointer">
          {value}
        </span>
      )}
    </div>
  );
};

export default ActionsList;
