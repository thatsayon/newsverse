"use client";
import { useState, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/utils/loginControl"; // Update with the correct path
import axios from "axios";
import { FaHome } from "react-icons/fa";
import { GrHomeRounded } from "react-icons/gr";
import './styles.css';

export default function LoginForm() {
  const [identifier, setIdentifier] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [trying, setTrying] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");

    try {
      setTrying(true);
      await login(identifier, password);
      window.location.href = "/";
    } catch (err) {
      setTrying(false);
      if (axios.isAxiosError(err)) {
        // Handle axios-specific errors
        setError(
          err.response?.data?.message || "Login failed. Please try again."
        );
      } else if (err instanceof Error) {
        // Handle other errors
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  const handleIdentifierChange = (e: ChangeEvent<HTMLInputElement>) =>
    setIdentifier(e.target.value);
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const handleIconClick = () => {
    window.location.href = "/";
  };
  return (
    <>
      <div className="h-screen flex items-center justify-center">
      <section>
        <span onClick={handleIconClick} className="clickable-icon flex items-center justify-center cursor-pointer ">
          <FaHome className="text-main-one text-6xl hover:text-[#181818]"/>
        </span>
        {Array.from({ length: 127 }, (_, i) => <span key={i}></span>)} {/* Creating remaining span elements */}
        <div className="signin">
          <div className="content">
            <h2>Sign In</h2>
            <form className="form" onSubmit={handleSubmit}>
              <div className="inputBox">
                <input
                  type="text"
                  value={identifier}
                  onChange={handleIdentifierChange}
                  required
                />
                <i>Username or Email</i>
              </div>
              <div className="inputBox">
                <input
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
                <i>Password</i>
              </div>
              <div className="links">
                <a href="#">Forgot Password ?</a>
                <a href="/signup">Signup</a>
              </div>
              {error && <p style={{ color: 'red' }}>{error}</p>}
              <div className="inputBox">
                <input type="submit" value={trying ? "Loading..." : "Login"}/>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
