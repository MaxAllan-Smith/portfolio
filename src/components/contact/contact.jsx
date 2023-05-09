import axios from "axios";
import React, { useState, useRef } from "react";

function Contact() {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    message: "",
  });

  const form = useRef();

  function handleSubmit(e) {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
  }

  function submit(e) {
    e.preventDefault();

    axios
      .post("/contact/submit", {
        firstName: data.firstName,
        lastName: data.lastName,
        emailAddress: data.emailAddress,
        message: data.message,
      })
      .then(function (response) {
        console.log(response.data);
      })
      .then(
        setData({
          firstName: "",
          lastName: "",
          emailAddress: "",
          message: "",
        })
      );
  }

  return (
    <form required onSubmit={(e) => submit(e)} ref={form}>
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
              id="firstName"
              className="m-2 p-1 rounded-lg text-center font-sans text-lg font-semibold w-[500px]"
              value={data.firstName}
              onChange={(e) => handleSubmit(e)}
            />
            <label htmlFor="textboxLastName" className="text-white">
              Last Name:
            </label>
            <input
              required
              type="text"
              name="textboxLastName"
              id="lastName"
              className="m-2 p-1 rounded-lg text-center font-sans text-lg font-semibold"
              value={data.lastName}
              onChange={(e) => handleSubmit(e)}
            />
            <label htmlFor="textboxEmailAddress" className="text-white">
              Email Address:
            </label>
            <input
              required
              type="email"
              name="textboxEmailAddress"
              id="emailAddress"
              className="m-2 p-1 rounded-lg text-center font-sans text-lg font-semibold"
              value={data.emailAddress}
              onChange={(e) => handleSubmit(e)}
            />
            <label htmlFor="textboxQuery" className="text-white">
              Message:
            </label>
            <textarea
              required
              name="textboxQuery"
              id="message"
              cols="30"
              rows="5"
              className="m-2 p-2 rounded-lg col-span-2 font-sans text-lg"
              value={data.message}
              onChange={(e) => handleSubmit(e)}
            ></textarea>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
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
