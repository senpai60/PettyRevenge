import React from "react";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import { useAuth } from "./context/AuthContext";

function App() {
  const {user} = useAuth()
  
  return (
    <main className="w-full min-h-screen bg-zinc-950 text-zinc-100 px-6 py-12 md:px-20 md:py-16">
      
      {user!==null ? (
        <>
        <header className="max-w-3xl mx-auto mb-16 text-center space-y-3">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-white">
          Petty Revenge
        </h1>

        <p className="text-lg md:text-xl text-zinc-400 max-w-xl mx-auto">
          Your slightly toxic, slightly helpful AI bestie 🤝
        </p>
      </header>
    
      {/* Main Content */}
      <div className="max-w-3xl mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
      </>
      ) : 
      <AuthPage/>
      }
      {/* Header */}

      
    </main>
  );
}

export default App;
