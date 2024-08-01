import { useState } from "react";
import Cookies from "js-cookie";
import "./styles.css";

export default function GContact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const userToken = Cookies.get('token');
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const sendMessage = async (formData: { name: string, email: string, message: string }) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/analytics/send-message/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${userToken}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.non_field_errors) {
          setApiError(errorData.non_field_errors[0]);
        } else {
          setApiError("An unknown error occurred.");
        }
        setSuccessMessage(null);
        return false;
      }

      const data = await response.json();
      console.log(data);
      setApiError(null);  // Clear any previous API error
      setSuccessMessage("We have received your message and will contact you as soon as possible.");
      return true;
    } catch (error) {
      setApiError("An error occurred while sending the message.");
      setSuccessMessage(null);
      return false;
    }
  };

  const handleSendMessage = async () => {
    if (!name || !email || !text) {
      setError("All fields are required.");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError(null);

    const formData = {
      name,
      email,
      message: text,
    };

    const success = await sendMessage(formData);

    if (success) {
      setName("");
      setEmail("");
      setText("");
    }
  };

  return (
    <>
      <div className="inputBox mb-4">
        <input
          placeholder=" "
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <i>Name</i>
      </div>

      <div className="inputBox mb-4">
        <input
          placeholder=" "
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <i>Email</i>
      </div>

      <div className="inputBox mb-2">
        <textarea
          name=""
          placeholder=" "
          value={text}
          onChange={(e) => setText(e.target.value)}
          id=""
        ></textarea>
        <i>Message</i>
      </div>

      {error && <p className="text-red-500 text-center mb-2">{error}</p>}
      {apiError && <p className="text-red-500 text-center mb-2">{apiError}</p>}
      {successMessage && <p className="text-green-500 text-center mb-2">{successMessage}</p>}
      <button
        className="bg-main-one text-black w-full font-semibold text-xl py-2 rounded-lg hover:bg-main-one-deep"
        onClick={handleSendMessage}
      >
        Send Message
      </button>
    </>
  );
}
