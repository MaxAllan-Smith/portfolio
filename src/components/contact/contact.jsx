import React, { useState } from "react";

function Contact() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("First Name: ", firstName);
    console.log("Last Name: ", lastName);
    console.log("Email Address: ", emailAddress);
    console.log("Message: ", message);
    // Add logic to submit the form data to your backend here
  };

  return (
    <form required onSubmit={handleSubmit}>
      <div className="flex justify-center p-20">
        <div className="bg-slate-800 bg-opacity-90 text-center border-2 border-slate-500 rounded-lg shadow-white shadow-md p-2">
          <h1 className="text-white font-bold text-xl mt-2">Contact Me</h1>
          <hr className="m-5 border-2 rounded" />
          <div className="grid gap-3 justify-center items-center p-4">
            <label htmlFor="textboxFirstName" className="text-white">
              First Name:
            </label>
            <input
              required
              type="text"
              name="textboxFirstName"
              id="textboxFirstName"
              className="m-2 p-1 rounded-lg text-center font-sans text-lg font-semibold w-[500px]"
              onChange={(event) => setFirstName(event.target.value)}
            />
            <label htmlFor="textboxLastName" className="text-white">
              Last Name:
            </label>
            <input
              required
              type="text"
              name="textboxLastName"
              id="textboxLastName"
              className="m-2 p-1 rounded-lg text-center font-sans text-lg font-semibold"
              onChange={(event) => setLastName(event.target.value)}
            />
            <label htmlFor="textboxEmailAddress" className="text-white">
              Email Address:
            </label>
            <input
              required
              type="email"
              name="textboxEmailAddress"
              id="textboxEmailAddress"
              className="m-2 p-1 rounded-lg text-center font-sans text-lg font-semibold"
              onChange={(event) => setEmailAddress(event.target.value)}
            />
            <label htmlFor="textboxQuery" className="text-white">
              Message:
            </label>
            <textarea
              required
              name="textboxQuery"
              id="textboxQuery"
              cols="30"
              rows="5"
              className="m-2 p-2 rounded-lg col-span-2 font-sans text-lg"
              onChange={(event) => setMessage(event.target.value)}
            ></textarea>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              onClick={handleSubmit}
              className="m-2 p-2 rounded-lg bg-blue-500 text-white w-60 font-semibold"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Contact;
