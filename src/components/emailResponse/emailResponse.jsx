import React, { useState, useEffect, useRef } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios'; // Assuming you're using axios. If not, replace this with your HTTP client

function EmailResponse() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [enquiry, setEnquiry] = useState("");
  const [response, setResponse] = useState("");

  let { userId } = useParams(); // This gets the userId from the URL.

  const textAreaRef = useRef(null);

  useEffect(() => {
    textAreaRef.current.style.height = "inherit";
    const scrollHeight = textAreaRef.current.scrollHeight;
    textAreaRef.current.style.height = scrollHeight + "px";

    // Replace 'http://localhost:3000/api/users/' with your API endpoint
    axios.get(`/contact/respond/${userId}`)
      .then(res => {
        const user = res.data;
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setEmail(user.emailAddress);
        setEnquiry(user.message); // Assuming your user object has an 'enquiry' field. If not, remove this line.
      })
      .catch(err => console.error(err));
  }, [userId, enquiry]); // Only run this effect when the userId changes

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform any necessary validation here

    // Submit the form data
    const formData = {
      firstName: firstName,
      lastName: lastName,
      emailAddress: email,
      enquiry: enquiry,
      response: response,
    };

    // Send the formData to the server or perform any other actions
    console.log(formData)

    // Reset the form fields
    setFirstName("");
    setLastName("");
    setEmail("");
    setEnquiry("");
    setResponse("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="my-4 max-w-2xl mx-auto p-4 bg-slate-800 opacity-90 rounded-lg shadow-md text-center border-slate-500 border-2"
    >
      <label className="block mb-2 text-white">
        <span className="text-lg">First Name:</span>
        <br />
        <input
          value={firstName}
          disabled
          onChange={(e) => setFirstName(e.target.value)}
          className="mt-1 p-2 bg-slate-400 border border-gray-300 rounded font-sans text-xl font-semibold text-black text-center"
        />
      </label>
      <br />
      <label className="block mb-2 text-white">
        <span className="text-lg">Last Name:</span>
        <br />
        <input
          value={lastName}
          disabled
          onChange={(e) => setLastName(e.target.value)}
          className="mt-1 bg-slate-400 p-2 border border-gray-300 rounded font-sans text-xl font-semibold text-black text-center"
        />
      </label>
      <br />
      <label className="block mb-2 text-white">
        <span className="text-lg">Email Address:</span>
        <br />
        <input
          value={email}
          disabled
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 bg-slate-400 p-2 border border-gray-300 rounded font-sans text-xl font-semibold text-black text-center"
        />
      </label>
      <br />
      <label className="block mb-2 text-white">
        <span className="text-lg">Enquiry Message:</span>
        <br />
        <textarea
          ref={textAreaRef}
          value={enquiry}
          disabled
          onChange={(e) => setEnquiry(e.target.value)}
          className="w-full mt-1 p-2 bg-slate-400 border border-gray-300 rounded font-sans text-lg font-md text-black text-center"
        />
      </label>
      <br />
      <label className="block mb-2 text-white">
        <span className="text-lg">Response Message:</span>
        <textarea
          value={response}
          onChange={(e) => setResponse(e.target.value)}
          className="w-full mt-1 p-2 border border-gray-300 rounded font-sans text-lg font-md text-black text-center"
        />
      </label>
      <button
        type="submit"
        className="w-full mt-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 opacity"
      >
        Submit
      </button>
    </form>
  );
}

export default EmailResponse;
