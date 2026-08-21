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

export const Dashboard: React.FC<{ token: string; onLogout: () => void }> = ({
  token,
  onLogout,
}) => {
  const [stats, setStats] = useState<AgeStat[]>([]);
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/students/stats/age", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setStats);

    fetch("http://localhost:3000/students", {
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
        backgroundColor: "rgba(208, 225, 253, 0.85)", // Blue pastel
        borderColor: "#a3c4f3",
        borderWidth: 1,
        borderRadius: 8,
      },
    ],
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "1100px", margin: "0 auto" }}>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "2rem",
        }}
      >
        <h2>Teacher Dashboard</h2>
        <button
          onClick={onLogout}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "var(--rose-pastel)",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </header>

      <section
        style={{
          backgroundColor: "#fff",
          padding: "1.5rem",
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          marginBottom: "2rem",
        }}
      >
        <h3>Age Distribution Statistics</h3>
        <Bar data={chartData} />
      </section>

      <section
        style={{
          backgroundColor: "#fff",
          padding: "1.5rem",
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        }}
      >
        <h3>Student Roster</h3>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr
              style={{
                backgroundColor: "var(--green-pastel)",
                textAlign: "left",
              }}
            >
              <th style={{ padding: "0.75rem" }}>ID</th>
              <th style={{ padding: "0.75rem" }}>First Name</th>
              <th style={{ padding: "0.75rem" }}>Last Name</th>
              <th style={{ padding: "0.75rem" }}>Age</th>
              <th style={{ padding: "0.75rem" }}>Email</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr
                key={student.id}
                style={{ borderBottom: "1px solid var(--border-subtle)" }}
              >
                <td style={{ padding: "0.75rem" }}>{student.id}</td>
                <td style={{ padding: "0.75rem" }}>{student.first_name}</td>
                <td style={{ padding: "0.75rem" }}>{student.last_name}</td>
                <td style={{ padding: "0.75rem" }}>{student.age}</td>
                <td style={{ padding: "0.75rem" }}>{student.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};
