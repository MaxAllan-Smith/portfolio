import axios from "axios";
import React, { useState } from "react";

function Login() {
  const [data, setData] = useState({
    emailAddress: "",
    password: "",
  });
  const [error, setError] = useState(null); // add state for error message

  function handleData(e) {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
  }

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post("/users/login", {
        emailAddress: data.emailAddress,
        password: data.password,
      })
      .then(function (response) {
        console.log(response.data);
      })
      .then(() => {
        setData({
          emailAddress: "",
          password: "",
        });
      })
      .catch(function (error) {
        setError(error.response.data.message); // set error message in state
      });
  }

  function handleCloseModal() {
    setError(null); // reset error state when modal is closed
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
        {error && (
          <div
            className="modal fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 z-50 flex justify-center items-center"
            onClick={() => handleCloseModal()}
          >
            <div className="bg-white rounded-lg p-6 text-center">
              <h2 className="text-red-500 font-bold mb-4">Error</h2>
              <p className="text-gray-800">{error}</p>
              <button
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg"
                onClick={() => handleCloseModal()}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

export default Login;
