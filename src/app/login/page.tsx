"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Input } from "@/components/atoms";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - just redirect to home
    router.push("/");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left - Cover Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <Image
          src="/assets/Cover Image-2.jpg"
          alt="Cover"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-[60px] left-[60px] right-[60px]">
          <h1 className="text-h1 text-white mb-[14px]">Hired & Wired</h1>
          <p className="text-description text-white/80">
            HR Platform for Modern Teams
          </p>
        </div>
      </div>

      {/* Right - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-[30px] bg-gray-100">
        <div className="w-full max-w-[400px]">
          <div className="mb-[60px]">
            <h2 className="text-h2 mb-[14px]">Welcome back</h2>
            <p className="text-pixel text-gray-500">
              Sign in to your account to continue
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-[24px]">
            <Input
              label="Email"
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button type="submit" variant="cta-small" className="w-full mt-[14px]">
              Sign In
            </Button>
          </form>

          <div className="mt-[30px] text-center">
            <span className="text-pixel text-gray-500">
              Don&apos;t have an account?{" "}
              <button className="text-black underline">
                Contact Admin
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

