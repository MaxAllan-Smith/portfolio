import React, { useState } from 'react'

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Username: ", username);
        console.log("Password: ", password);
        // Add logic to submit the form data to your backend here
    };

    return ( 
        <div className="flex flex-col 100vh text-sm ">
            <form onSubmit={handleSubmit} className="p-10 mx-auto mt-56 w-2/5 bg-slate-800 rounded-xl shadow-2xl shadow-slate-700 border-solid border-slate-500 border-2 opacity-90">
                <div className="mb-8">
                    <label htmlFor="username" className="block text-white font-bold mb-3">Username/Email:</label>
                    <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    className="border rounded-lg px-3 py-2 w-full text-center"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-white font-bold mb-3">Password:</label>
                    <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="border rounded-lg px-3 py-2 w-full text-center"
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white rounded-lg px-4 py-2 mt-5 hover:bg-blue-700">Log In</button>
            </form>
        </div>
     );
}

export default Login;