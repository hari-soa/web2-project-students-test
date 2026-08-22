import React, { useState } from "react";

interface LoginProps {
  onLoginSuccess: (token: string) => void;
}

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const CONTAINER_STYLE: React.CSSProperties = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "var(--bg-pastel, #f0f4f8)",
  padding: "1rem",
};

const CARD_STYLE: React.CSSProperties = {
  maxWidth: "400px",
  width: "100%",
  backgroundColor: "var(--card-bg, #ffffff)",
  padding: "2rem",
  borderRadius: "16px",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
  border: "1px solid #e2e8f0",
};

const HEADING_STYLE: React.CSSProperties = {
  fontSize: "1.5rem",
  fontWeight: "bold",
  textAlign: "center",
  color: "#334155",
  marginBottom: "1.5rem",
};

const FORM_STYLE: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "1.25rem",
};

const ERROR_BOX_STYLE: React.CSSProperties = {
  padding: "0.75rem",
  backgroundColor: "#fef2f2",
  border: "1px solid #fecaca",
  color: "#dc2626",
  fontSize: "0.875rem",
  borderRadius: "8px",
  textAlign: "center",
  marginBottom: "1rem",
};

const GROUP_STYLE: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
};

const LABEL_STYLE: React.CSSProperties = {
  fontSize: "0.875rem",
  fontWeight: 600,
  color: "#475569",
};

const INPUT_STYLE: React.CSSProperties = {
  width: "100%",
  padding: "0.625rem 0.875rem",
  backgroundColor: "#f8fafc",
  border: "1px solid #cbd5e1",
  borderRadius: "8px",
  fontSize: "0.875rem",
  color: "#1e293b",
  outline: "none",
  boxSizing: "border-box",
};

const BUTTON_STYLE: React.CSSProperties = {
  width: "100%",
  padding: "0.75rem",
  backgroundColor: "var(--pastel-green, #a8e6cf)",
  color: "#1b4332",
  fontWeight: "bold",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  marginTop: "0.5rem",
  fontSize: "0.95rem",
};

export const Login = ({ onLoginSuccess }: LoginProps) => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      });

      const textData = await response.text();
      const data = textData ? JSON.parse(textData) : {};

      if (!response.ok) {
        throw new Error(data.message);
      }

      localStorage.setItem("token", data.token);
      onLoginSuccess(data.token);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <div style={CONTAINER_STYLE}>
      <div style={CARD_STYLE}>
        <h2 style={HEADING_STYLE}>Teacher Login</h2>

        {error && <div style={ERROR_BOX_STYLE}>{error}</div>}

        <form onSubmit={handleSubmit} style={FORM_STYLE}>
          <div style={GROUP_STYLE}>
            <label style={LABEL_STYLE} htmlFor="identifier">
              Name, Reference or Email
            </label>
            <input
              id="identifier"
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              style={INPUT_STYLE}
              required
            />
          </div>

          <div style={GROUP_STYLE}>
            <label style={LABEL_STYLE} htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={INPUT_STYLE}
              required
            />
          </div>

          <button type="submit" style={BUTTON_STYLE}>
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};
