import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedTickets = JSON.parse(localStorage.getItem("tickets")) || [];
    setTickets(savedTickets);
  }, []);

  const handleStatusChange = (id, newStatus) => {
    const updatedTickets = tickets.map((t) =>
      t.id === id ? { ...t, status: newStatus } : t
    );
    setTickets(updatedTickets);
    localStorage.setItem("tickets", JSON.stringify(updatedTickets));
  };

  const handleDelete = (id) => {
    const updatedTickets = tickets.filter((t) => t.id !== id);
    setTickets(updatedTickets);
    localStorage.setItem("tickets", JSON.stringify(updatedTickets));
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <table className="w-full border">
        <thead>
          <tr>
            <th className="border px-2 py-1">Name</th>
            <th className="border px-2 py-1">Issue</th>
            <th className="border px-2 py-1">Priority</th>
            <th className="border px-2 py-1">Status</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.id}>
              <td className="border px-2 py-1">{ticket.name}</td>
              <td className="border px-2 py-1">{ticket.issue}</td>
              <td className="border px-2 py-1">{ticket.priority}</td>
              <td className="border px-2 py-1">
                <select
                  value={ticket.status}
                  onChange={(e) =>
                    handleStatusChange(ticket.id, e.target.value)
                  }
                >
                  <option>Open</option>
                  <option>In Progress</option>
                  <option>Resolved</option>
                </select>
              </td>
              <td className="border px-2 py-1 space-x-2">
                <button
                  onClick={() => setSelectedTicket(ticket)}
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                >
                  View
                </button>
                <button
                  onClick={() => handleDelete(ticket.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded max-w-md w-full">
            <h2 className="text-xl font-bold mb-2">Ticket Details</h2>
            <p><strong>Name:</strong> {selectedTicket.name}</p>
            <p><strong>Issue:</strong> {selectedTicket.issue}</p>
            <p><strong>Priority:</strong> {selectedTicket.priority}</p>
            <p><strong>Status:</strong> {selectedTicket.status}</p>
            <button
              onClick={() => setSelectedTicket(null)}
              className="mt-4 bg-gray-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
