import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

interface AgeStat {
  age: number;
  count: number;
}

interface Student {
  id: number;
  first_name: string;
  last_name: string;
  age: number;
  email: string;
}

interface DashboardProps {
  token: string;
  onLogout: () => void;
}

const API_URL = import.meta.env.VITE_API_URL;

const CONTAINER_STYLE: React.CSSProperties = {
  padding: "2rem",
  maxWidth: "1000px",
  margin: "0 auto",
};

const HEADER_STYLE: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "2rem",
};

const LOGOUT_BUTTON_STYLE: React.CSSProperties = {
  padding: "0.5rem 1rem",
  backgroundColor: "var(--pastel-rose)",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const CARD_SECTION_STYLE: React.CSSProperties = {
  backgroundColor: "var(--card-bg)",
  padding: "1.5rem",
  borderRadius: "12px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
  marginBottom: "2rem",
};

const TABLE_STYLE: React.CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
};

const TABLE_HEADER_ROW_STYLE: React.CSSProperties = {
  backgroundColor: "var(--pastel-green)",
  textAlign: "left",
};

const CELL_STYLE: React.CSSProperties = {
  padding: "0.75rem",
};

const TABLE_ROW_STYLE: React.CSSProperties = {
  borderBottom: "1px solid var(--border-subtle)",
};

export const Dashboard = ({ token, onLogout }: DashboardProps) => {
  const [stats, setStats] = useState<AgeStat[]>([]);
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/students/stats/age`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setStats);

    fetch(`${API_URL}/students`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setStudents);
  }, [token]);

  const chartData = {
    labels: stats.map((s) => `${s.age} y/o`),
    datasets: [
      {
        label: "Students Count",
        data: stats.map((s) => s.count),
        backgroundColor: "rgba(208, 225, 253, 0.85)",
        borderColor: "#a3c4f3",
        borderWidth: 1,
        borderRadius: 8,
      },
    ],
  };

  return (
    <div style={CONTAINER_STYLE}>
      <header style={HEADER_STYLE}>
        <h2>Teacher Management Portal</h2>
        <button onClick={onLogout} style={LOGOUT_BUTTON_STYLE}>
          Logout
        </button>
      </header>

      <section style={CARD_SECTION_STYLE}>
        <h3>Age Distribution Statistics</h3>
        <Bar data={chartData} />
      </section>

      <section style={{ ...CARD_SECTION_STYLE, marginBottom: 0 }}>
        <h3>Student Roster</h3>
        <table style={TABLE_STYLE}>
          <thead>
            <tr style={TABLE_HEADER_ROW_STYLE}>
              <th style={CELL_STYLE}>ID</th>
              <th style={CELL_STYLE}>First Name</th>
              <th style={CELL_STYLE}>Last Name</th>
              <th style={CELL_STYLE}>Age</th>
              <th style={CELL_STYLE}>Email</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} style={TABLE_ROW_STYLE}>
                <td style={CELL_STYLE}>{student.id}</td>
                <td style={CELL_STYLE}>{student.first_name}</td>
                <td style={CELL_STYLE}>{student.last_name}</td>
                <td style={CELL_STYLE}>{student.age}</td>
                <td style={CELL_STYLE}>{student.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};
