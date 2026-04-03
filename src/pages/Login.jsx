import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PrimaryButton } from "../components/ui/PrimaryButton";
import { InputField } from "../components/ui/InputField";
import { GlassCard } from "../components/ui/GlassCard";

export function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate auth network delay
    setTimeout(() => {
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-primary flex flex-col justify-center py-12 sm:px-6 lg:px-8 selection:bg-savaari-accent selection:text-primary relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-savaari-accent/10 rounded-full blur-[100px] pointer-events-none transform translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-savaari-green/10 rounded-full blur-[100px] pointer-events-none transform -translate-x-1/2 translate-y-1/2" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center">
        <Link to="/" className="inline-flex items-center justify-center gap-2 mb-8 bg-black/50 p-2 rounded-full border border-white/5 backdrop-blur-md">
          <span className="text-white font-bold text-xl tracking-tight mr-4">Ridy</span>
        </Link>
        <h2 className="text-center text-3xl font-bold tracking-tight text-white mb-2">
          Agent Portal
        </h2>
        <h2 className="text-center text-3xl font-bold tracking-tight text-white mb-2">
          Agent Portal
        </h2>
        <p className="text-center text-sm text-savaari-gray">
          Sign in with your workspace credentials.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <GlassCard hoverEffect={false} className="py-8 px-4 sm:px-10 bg-[#0B0B0C]/80 border-white/5">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <InputField 
                label="Agent ID or Email" 
                id="email" 
                name="email" 
                type="text" 
                required 
                placeholder="agent@ridy.io"
                defaultValue="admin@ridy.io"
              />
            </div>

            <div>
              <InputField 
                label="Password" 
                id="password" 
                name="password" 
                type="password" 
                required 
                placeholder="••••••••"
                defaultValue="password123"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 bg-transparent border-savaari-border rounded focus:ring-savaari-accent text-savaari-accent cursor-pointer"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-savaari-gray cursor-pointer">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-savaari-accent hover:text-savaari-accent/80 transition-colors">
                  Forgot password?
                </a>
              </div>
            </div>

            <div>
              <PrimaryButton type="submit" variant="accent" className="w-full flex justify-center py-3">
                {loading ? "Authenticating..." : "Sign in"}
              </PrimaryButton>
            </div>
          </form>
        </GlassCard>
      </div>
    </div>
  );
}
