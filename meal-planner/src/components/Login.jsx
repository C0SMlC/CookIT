import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  let navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const axiosInstance = axios.create({
        baseURL: "http://localhost:3000",
        withCredentials: true,
      });

      const res = await axiosInstance.post("/users/login", {
        email,
        password,
      });

      console.log(res);

      if (res.data.status === "success") {
        navigate("/app");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred during login.");
      }
    }
  };

  return (
    <div>
      <h2>Log into your account</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleLogin}>
        <div>
          <label>Email address</label>
          <input
            type="email"
            placeholder="you@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            placeholder="••••••••"
            required
            minLength="8"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
