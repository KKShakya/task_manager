"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { apiRequest } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";



export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Load Google Identity Services script dynamically
  useEffect(() => {
    const scriptId = "google-identity";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.id = scriptId;
      document.body.appendChild(script);
      script.onload = initializeGoogleSignIn;
    } else {
      initializeGoogleSignIn();
    }

  }, []);
  // Initialize Google sign-in button
console.log(process.env.NEXT_PUBLIC_BACKEND_URL)
  const initializeGoogleSignIn = () => {
    /* global google */
    if (!window.google) return;

    google.accounts.id.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
      callback: handleGoogleCredentialResponse,
    });

    google.accounts.id.renderButton(
      document.getElementById("google-signin")!,
      { theme: "outline", size: "large", width: 280 }
    );
  };

  // Called after Google Sign-In, sends idToken to backend
  const handleGoogleCredentialResponse = async (response: any) => {
    const idToken = response.credential;
    
    console.log(process.env.NEXT_PUBLIC_BACKEND_URL)
    

    try {
      setLoading(true);
      const res = await apiRequest("/auth/google", "POST", { idToken });
      localStorage.setItem("token", res.token);
      toast.success("Login successful (Google)");
      router.push("/");
    } catch (err: any) {
      toast.error(err.message || "Google login failed");
    } finally {
      setLoading(false);
    }
  };

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleLogin = async () => {
    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (!password) {
      toast.error("Password cannot be empty");
      return;
    }

    try {
      setLoading(true);
      const res = await apiRequest("/auth/login", "POST", { email, password });
      localStorage.setItem("token", res.token);
      toast.success("Login successful");
      router.push("/");
    } catch (err: any) {
      toast.error(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <div className="w-80 space-y-3">
        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="relative">
          <Input
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <Button className="w-full" onClick={handleLogin} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </Button>

        <div className="flex justify-center my-4">
          <div id="google-signin"></div>
        </div>

        <p className="text-sm text-center">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
