import React, { useState } from "react";
import axios from "axios";

function SignUp() {
  const [data, setData] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    emailAddress: "",
    password: "",
    confirmPassword: "",
  });

  function handleSubmit(e) {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
  }

  function submit(e) {
    e.preventDefault();
    axios
      .post("/auth/register", {
        userName: data.userName,
        firstName: data.firstName,
        lastName: data.lastName,
        emailAddress: data.emailAddress,
        password: data.password,
      })
      .then(function (response) {
        console.log(response.data);
      })
      .then(
        setData({
          userName: "",
          firstName: "",
          lastName: "",
          emailAddress: "",
          password: "",
          confirmPassword: "",
        })
      );
  }

  return (
    <div className="text-sm flex justify-center items-center">
      <form
        onSubmit={(e) => submit(e)}
        className="m-10 p-10 text-sm w-[500px] bg-slate-800 rounded-xl shadow-2xl shadow-slate-700 border-solid border-slate-500 border-2 opacity-90"
        id="formSignUp"
      >
        <div className="mb-5">
          <label htmlFor="username" className="block text-white font-bold mb-3">
            Username:
          </label>
          <input
            type="text"
            id="userName"
            value={data.userName}
            onChange={(e) => handleSubmit(e)}
            className="border text-xs rounded-lg px-3 py-2 w-full text-center"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="email-address"
            className="block text-white font-bold mb-3"
          >
            Email Address:
          </label>
          <input
            type="email"
            id="emailAddress"
            value={data.emailAddress}
            onChange={(e) => handleSubmit(e)}
            className="border text-xs rounded-lg px-3 py-2 w-full text-center"
            required
          />
        </div>
        <div className="mb-5">
          <label htmlFor="password" className="block text-white font-bold mb-3">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={data.password}
            onChange={(e) => handleSubmit(e)}
            className="border text-xs rounded-lg px-3 py-2 w-full text-center"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="confirm-password"
            className="block text-white font-bold mb-3"
          >
            Confirm Password:
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={data.confirmPassword}
            onChange={(e) => handleSubmit(e)}
            className="border text-xs rounded-lg px-3 py-2 w-full text-center"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="first-name"
            className="block text-white font-bold mb-3"
          >
            First Name:
          </label>
          <input
            id="firstName"
            value={data.firstName}
            onChange={(e) => handleSubmit(e)}
            className="border text-xs rounded-lg px-3 py-2 w-full text-center"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="last-name"
            className="block text-white font-bold mb-3"
          >
            Last Name:
          </label>
          <input
            id="lastName"
            value={data.lastName}
            onChange={(e) => handleSubmit(e)}
            className="border text-xs rounded-lg px-3 py-2 w-full text-center"
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
