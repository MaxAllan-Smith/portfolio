import axios from "axios";
import React, { useState } from "react";

function Login() {
  const [data, setData] = useState({
    emailAddress: "",
    password: "",
  });

  function handleData(e) {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
  }

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .get("/users/login", {
        emailAddress: data.emailAddress,
        password: data.password,
      })
      .then(function (response) {
        console.log(response.data);
      })
      .then(
        setData({
          emailAddress: "",
          password: "",
        })
      );
  }

  return (
    <div className="flex flex-col 100vh ">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="p-10 text-sm mx-auto mt-20 bg-slate-800 rounded-xl shadow-2xl shadow-slate-700 border-solid border-slate-500 border-2 opacity-90"
      >
        <div className="mb-8">
          <label htmlFor="username" className="block text-white font-bold mb-3">
            Username/Email:
          </label>
          <input
            type="text"
            id="emailAddress"
            value={data.emailAddress}
            onChange={(e) => handleData(e)}
            className="border text-xs w-[450px] text-sm rounded-lg px-3 py-2 text-center"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-white font-bold mb-3">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={data.password}
            onChange={(e) => handleData(e)}
            className="border text-xs rounded-lg px-3 py-2 w-full text-center"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-lg px-4 py-2 mt-5 hover:bg-blue-700"
        >
          Log In
        </button>
      </form>
    </div>
  );
}

export default Login;
