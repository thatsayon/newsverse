"use client";
import { useState, useEffect, useMemo } from "react";
import "./signupStyle.css";

function Step1({
  username,
  setUsername,
  email,
  setEmail,
  fullName,
  setFullName,
  password,
  setPassword,
}: {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  fullName: string;
  setFullName: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div>
      <h2>Create a News Verse account</h2>
      <div className="flex flex-col gap-y-3">
        <div className="inputBox">
          <input
            type="text"
            required
            placeholder=" "
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <i>Username</i>
        </div>
        <div className="inputBox">
          <input
            type="email"
            required
            placeholder=" "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <i>Email</i>
        </div>
        <div className="inputBox">
          <input
            type="text"
            required
            placeholder=" "
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <i>Full Name</i>
        </div>
        <div className="inputBox">
          <input type="text" required placeholder=" " value={password} />
          <i>Password</i>
        </div>
      </div>
    </div>
  );
}

function Step2() {
  return (
    <div>
      <h2>Step 2</h2>
      <p>This is the second step of the sign-up process.</p>
    </div>
  );
}

function Step3() {
  return (
    <div>
      <h2>Step 3</h2>
      <p>This is the third step of the sign-up process.</p>
    </div>
  );
}

function Step4() {
  return (
    <div>
      <h2>Step 4</h2>
      <p>This is the fourth step of the sign-up process.</p>
    </div>
  );
}

function Step5() {
  return (
    <div>
      <h2>Step 5</h2>
      <p>This is the fifth step of the sign-up process.</p>
    </div>
  );
}

export default function SignUp() {
  const [step, setStep] = useState(0);

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(false);

  useEffect(() => {
    const isEmailValid = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
    setIsValid(username.trim() !== "" && isEmailValid);
  }, [username, email]);

  const steps = useMemo(
    () => [
      <Step1
        key="step1"
        username={username}
        setUsername={setUsername}
        email={email}
        setEmail={setEmail}
        fullName={fullName}
        setFullName={setFullName}
        password={password}
        setPassword={setPassword}
      />,
      <Step2 key="step2" />,
      <Step3 key="step3" />,
      <Step4 key="step4" />,
      <Step5 key="step5" />,
    ],
    [username, email, fullName]
  );

  const nextStep = () => {
    if (step === 0 && !isValid) return;
    if (step < steps.length - 1) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  return (
    <>
      <div className="h-screen flex justify-center items-center">
        <div
          style={{ boxShadow: "0 15px 35px rgba(0, 0, 0, 0.9)" }}
          className="bg-[#222] w-2/6 px-12 py-10"
        >
          <div>{steps[step]}</div>

          <div className="flex justify-between mt-4">
            <button
              onClick={prevStep}
              disabled={step === 0}
              className={
                step === 0
                  ? "invisible"
                  : "bg-main-one text-[#222] px-2 py-1 rounded font-semibold"
              }
            >
              Previous
            </button>
            <button
              onClick={nextStep}
              disabled={step === steps.length - 1 || (step === 0 && !isValid)}
              className={
                step === steps.length - 1 || (step === 0 && !isValid)
                  ? "bg-[#333] text-white px-2 py-1 rounded font-semibold"
                  : "bg-main-one text-[#222] px-2 py-1 rounded font-semibold"
              }
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
