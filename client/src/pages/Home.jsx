import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Auth from "../components/Auth";

const Home = () => {
  const [authMode, setAuthMode] = useState(null)

  const openRegister = () => setAuthMode("signup");
  const handleClose = () => setAuthMode(null);

  return (
    <>
      <div className="bg-home min-h-screen w-full relative">
        <Navbar />
        <hr className="border-black" />
        <div className="flex items-center justify-center max-w-6xl mx-auto py-20">
          <div className="flex flex-col items-start gap-10">
            <h1 className="text-9xl font-serif font-thin">
              Human <br /> stories & ideas
            </h1>
            <p className="text-2xl">
              A place to read, write, and deepen your understanding
            </p>
            <button
              onClick={openRegister}
              className="bg-black text-white py-3 px-10 rounded-full text-xl"
            >
              Start reading
            </button>
          </div>
        </div>
        <Footer />
      </div>

      {authMode && (
        <Auth mode={authMode} setMode={setAuthMode} onClose={handleClose} />
      )}
    </>
  );
};

export default Home;