"use client";

import Image from "next/image"
import Link from "next/link"
import useUser from "@/hooks/useUser"
import ErrorToast from "@/components/Error";
import SuccessToast from "@/components/Success";
import { useState } from "react";

export default function Register() {

    const [email, setEmail] = useState<string>("");
    const [firstname, setFirstname] = useState<string>("");
    const [lastname, setLastname] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordConfirm, setPasswordConfirm] = useState<string>("");

    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const { register } = useUser();

    const handleRegister = async () => {
        await register(email, firstname, lastname, password, passwordConfirm).
        then((response) => {
            setError(null);
            setSuccess("Registeration successful!");
        })
        .catch((error: any) => {
            setError(error);
            setSuccess(null);
        });
    };

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
            <h2 className="card-title text-2xl font-bold text-center mb-2">Register</h2>

            <div className="space-y-4">
                <div className="form-control">
                <label className="label">
                    <span className="label-text">E-Mail</span>
                </label>
                <input type="email" placeholder="admin@example.com" className="input input-bordered w-full" required onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="flex gap-2">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Firstname</span>
                        </label>
                        <input type="text" placeholder="Your" className="input input-bordered w-full" required onChange={(e) => setFirstname(e.target.value)}/>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Lastname</span>
                        </label>
                        <input type="text" placeholder="Name" className="input input-bordered w-full" required onChange={(e) => setLastname(e.target.value)}/>
                    </div>
                </div>

                <div className="divider"></div>

                <div className="form-control">
                <label className="label">
                    <span className="label-text">Password</span>
                </label>
                <input type="password" placeholder="••••••••" className="input input-bordered w-full" required onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className="form-control">
                <label className="label">
                    <span className="label-text">Confirm Password</span>
                </label>
                <input type="password" placeholder="••••••••" className="input input-bordered w-full" required onChange={(e) => setPasswordConfirm(e.target.value)} />
                </div>

                <div className="form-control mt-6">
                <button className="btn btn-primary w-full" onClick={handleRegister}>Register</button>
                </div>
            </div>

            <div className="text-center mt-4">
                <span className="text-sm">Already have an account? </span>
                <Link href="/" className="link link-primary text-sm">
                Login
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
