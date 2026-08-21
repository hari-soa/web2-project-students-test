import { useState } from "react";
import { Dashboard } from "./components/dashboard";
import { Login } from "./components/Login";

export default function App() {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token"),
  );

  if (!token) {
    return <Login onLoginSuccess={(newToken) => setToken(newToken)} />;
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
