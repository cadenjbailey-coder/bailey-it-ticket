import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Home() {
  const [name, setName] = useState("");
  const [issue, setIssue] = useState("");
  const [priority, setPriority] = useState("Low");
  const [tickets, setTickets] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const savedTickets = JSON.parse(localStorage.getItem("tickets")) || [];
    setTickets(savedTickets);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTicket = {
      id: Date.now(),
      name,
      issue,
      priority,
      status: "Open",
    };
    const updatedTickets = [...tickets, newTicket];
    setTickets(updatedTickets);
    localStorage.setItem("tickets", JSON.stringify(updatedTickets));
    setName("");
    setIssue("");
    setPriority("Low");
    alert("Ticket submitted!");
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Bailey IT Ticket</h1>
        <Link to="/admin-login">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Admin Login
          </button>
        </Link>
      </div>
      <h2 className="text-xl mb-4">
        Enter IT Issue for Husband/Dad to solve
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label>Issue:</label>
          <textarea
            value={issue}
            required
            onChange={(e) => setIssue(e.target.value)}
            className="w-full border p-2 rounded"
          ></textarea>
        </div>

        <div>
          <label>Priority:</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Submit Ticket
        </button>
      </form>
    </div>
  );
}
