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
        <div className="formLogin">
            <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-4 p-4 bg-inherit rounded-lg shadow-lg border-solid border-2">
                <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-700 font-bold mb-2">Username:</label>
                    <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    className="border rounded-lg px-3 py-2 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password:</label>
                    <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="border rounded-lg px-3 py-2 w-full"
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-700">Submit</button>
            </form>
        </div>
     );
}

export default Login;