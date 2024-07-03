import { useState } from "react";
import "./styles.css";

export default function GContact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState<string | null>(null); // State to manage error messages

  const isValidEmail = (email: string) => {
    // Regular expression to validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSendMessage = () => {
    // Validation checks
    if (!name || !email || !text) {
      setError("All fields are required.");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Clear the error message if validation passes
    setError(null);

    // Create a JSON object with the form data
    const formData = {
      name,
      email,
      message: text,
    };

    // Log the JSON data to the console (or send it to a server)
    console.log("Form Data:", JSON.stringify(formData));

    // Reset the form fields
    setName("");
    setEmail("");
    setText("");

    // Optionally, you can add additional actions like showing a success message
  };

  return (
    <>
      <div className="">
        <div className="inputBox mb-4">
          <input
            placeholder=" "
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)} // Handle name input change
            required
          />
          <i>Name</i>
        </div>

        <div className="inputBox mb-4">
          <input
            placeholder=" "
            type="email" // Changed to "email" type for better validation
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Handle email input change
            required
          />
          <i>Email</i>
        </div>

        <div className="inputBox mb-2">
          <textarea
            name=""
            placeholder=" "
            value={text}
            onChange={(e) => setText(e.target.value)} // Handle text area input change
            id=""
          ></textarea>
          <i>Message</i>
        </div>

        {error && <p className="text-red-500 text-center mb-2">{error}</p>}
        <button
          className="bg-main-one text-black w-full font-semibold text-xl py-2 rounded-lg hover:bg-main-one-deep"
          onClick={handleSendMessage} // Handle send message button click
        >
          Send Message
        </button>
      </div>
    </>
  );
}
