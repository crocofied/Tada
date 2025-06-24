"use client"

import Image from "next/image"
import Link from "next/link"
import Cookies from "js-cookie";
import useUser from "@/hooks/useUser"
import ErrorToast from "@/components/Error";
import SuccessToast from "@/components/Success";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const { login } = useUser()

  const router = useRouter()

  const handleLogin = async () => {
        try {
          const token = await login(email, password);
          Cookies.set("token", token, { 
            expires: 7,
            path: '/',
            sameSite: 'Lax'
          });
          
          await new Promise(resolve => setTimeout(resolve, 50));
          
          setError(null);
          setSuccess("Login successful!");
          router.push("/dashboard");
        } catch (error: any) {
            setError(error.message || String(error));
            setSuccess(null);
        }
  }
  return (
    <>
      <div className="min-h-screen bg-base-200 flex flex-col items-center justify-center p-4">
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center justify-center mb-4">
          <Image src="/logo.png" alt="Logo" width={125} height={125} className="mask mask-circle" />
          </div>
          <h1 className="text-4xl font-bold text-primary">Tada</h1>
        </div>

        <div className="card w-full max-w-md bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl font-bold text-center mb-2">Login</h2>

            <div className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">E-Mail</span>
                </label>
                <input type="email" placeholder="admin@example.com" className="input input-bordered w-full" required onChange={(e) => setEmail(e.target.value)}/>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" placeholder="••••••••" className="input input-bordered w-full" required onChange={(e) => setPassword(e.target.value)}/>
              </div>

              <div className="form-control mt-6">
                <button className="btn btn-primary w-full" onClick={handleLogin}>Login</button>
              </div>
            </div>

            <div className="text-center mt-4">
              <span className="text-sm">Don't have an account? </span>
              <Link href="/register" className="link link-primary text-sm">
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>

      <ErrorToast message={error as string} show={error !== null} onClose={() => setError(null)} />
      <SuccessToast message={success as string} show={success !== null} onClose={() => setSuccess(null)} />
    </>
  )
}
