import React, { useState } from "react";

function SignUp() {

  const [username, setUsername] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassord, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Username: ", username);
    console.log("Email Address: ", emailAddress);
    console.log("Password: ", password);
    console.log("First Name: ", firstName);
    console.log("Last Name: ", lastName);

    
    // Add logic to submit the form data to your backend here
  };

  return (
    <div className="text-sm flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="m-10 p-10 w-2/6 bg-slate-800 rounded-xl shadow-2xl shadow-slate-700 border-solid border-slate-500 border-2 opacity-90"
        id="formSignUp"
      >
        <div className="mb-8">
          <label htmlFor="username" className="block text-white font-bold mb-3">
            Username:
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            className="border rounded-lg px-3 py-2 w-full text-center"
            required
          />
        </div>
        <div className="mb-8">
          <label
            htmlFor="email-address"
            className="block text-white font-bold mb-3"
          >
            Email Address:
          </label>
          <input
            type="text"
            id="email-address"
            value={emailAddress}
            onChange={(event) => setEmailAddress(event.target.value)}
            className="border rounded-lg px-3 py-2 w-full text-center"
            required
          />
        </div>
        <div className="mb-8">
          <label htmlFor="password" className="block text-white font-bold mb-3">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="border rounded-lg px-3 py-2 w-full text-center"
            required
          />
        </div>
        <div className="mb-8">
          <label
            htmlFor="confirm-password"
            className="block text-white font-bold mb-3"
          >
            Confirm Password:
          </label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassord}
            onChange={(event) => setConfirmPassword(event.target.value)}
            className="border rounded-lg px-3 py-2 w-full text-center"
            required
          />
        </div>
        <div className="mb-8">
          <label
            htmlFor="first-name"
            className="block text-white font-bold mb-3"
          >
            First Name:
          </label>
          <input
            id="first-name"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            className="border rounded-lg px-3 py-2 w-full text-center"
            required
          />
        </div>
        <div className="mb-8">
          <label
            htmlFor="last-name"
            className="block text-white font-bold mb-3"
          >
            Last Name:
          </label>
          <input
            id="last-name"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            className="border rounded-lg px-3 py-2 w-full text-center"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-lg px-4 py-2 mt-5 hover:bg-blue-700"
        >
          Sign Up
        </button>
      </form>

    </div>
  );
}

export default SignUp;
