import React, { useState } from "react";

interface LoginProps {
  onLoginSuccess: (token: string) => void;
}

const CONTAINER_STYLE =
  "min-h-screen flex items-center justify-center bg-gray-50 px-4";
const CARD_STYLE =
  "max-w-md w-full bg-white p-8 rounded-xl shadow-md border border-gray-100";
const HEADING_STYLE = "text-2xl font-bold text-center text-gray-800 mb-6";
const FORM_STYLE = "space-y-4";

const ERROR_BOX_STYLE =
  "p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg text-center font-medium";

const GROUP_STYLE = "flex flex-col gap-1.5";
const LABEL_STYLE = "text-sm font-medium text-gray-700";
const INPUT_STYLE =
  "w-full px-3.5 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400 text-sm transition-all";

const BUTTON_STYLE =
  "w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors cursor-pointer mt-2";

export const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }

      localStorage.setItem("token", data.token);
      onLoginSuccess(data.token);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className={CONTAINER_STYLE}>
      <div className={CARD_STYLE}>
        <h2 className={HEADING_STYLE}>Teacher Login</h2>

        {error && <div className={ERROR_BOX_STYLE}>{error}</div>}

        <form onSubmit={handleSubmit} className={FORM_STYLE}>
          <div className={GROUP_STYLE}>
            <label className={LABEL_STYLE} htmlFor="identifier">
              Name, Reference or Email
            </label>
            <input
              id="identifier"
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className={INPUT_STYLE}
              required
            />
          </div>

          <div className={GROUP_STYLE}>
            <label className={LABEL_STYLE} htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={INPUT_STYLE}
              required
            />
          </div>

          <button type="submit" className={BUTTON_STYLE}>
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};
