import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const EmailVerification = () => {
  const [verificationStatus, setVerificationStatus] = useState("Verifying...");
  const { token } = useParams();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(`${token}`);
        setVerificationStatus(response.data);
      } catch (error) {
        console.log(error);
        setVerificationStatus("Error verifying email address.");
      }
    };

    verifyEmail();

    // Wait for 5 seconds before redirecting to the login page
    const timer = setTimeout(() => {
      window.location.href = "/login"; // Change the URL to the login page
    }, 4000);

    return () => clearTimeout(timer); // Clear the timer if the component unmounts
  }, [token]);

  return (
    <div className="text-2xl border-2 rounded-lg backdrop-blur-sm bg-slate-600 bg-opacity-60 flex justify-center items-center py-6 mx-[300px] mt-32 text-white">
      <h2>{verificationStatus}</h2>
    </div>
  );
};

export default EmailVerification;
