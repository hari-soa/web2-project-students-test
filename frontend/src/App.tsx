import { useState } from "react";
import { Dashboard } from "./components/dashboard";

export default function App() {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token"),
  );

  if (!token) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>Teacher Login</h2>
        <button
          onClick={() => {
            setToken("demo_token");
            localStorage.setItem("token", "demo_token");
          }}
        >
          Simulate Login
        </button>
      </div>
    );
  }

  return (
    <Dashboard
      token={token}
      onLogout={() => {
        setToken(null);
        localStorage.removeItem("token");
      }}
    />
  );
}
