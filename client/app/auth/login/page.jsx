"use client"

import Link from "next/link"
import { signIn } from "next-auth/react";
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async () => {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: "/home",
    });
  };

  return (
    <div className="h-screen relative flex content-center justify-center bg-zinc-950">
      <div className="flex flex-col content-center justify-center">
        <div className="rounded-lg h-1/2 max-w-sm p-4 sm:p-6 lg:p-8 bg-zinc-950">
            
          <form className="space-y-6" action="" method="post">
            <h3 className="text-3xl font-extrabold text-center text-white">SIGN IN TO CARAMEL</h3>
            <div>
              <label htmlFor="email" className="text-sm font-medium block mb-2 text-white">Your email</label>
              <input
                type="email"
                name="email"
                id="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className=" border-zinc-900   sm:text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 bg-zinc-900 text-white"
              />
            </div>

            <div>
              <label htmlFor="password" className="text-sm font-medium block mb-2 text-white">Your password</label>
              <input
                type="password"
                name="password"
                id="password"
                required
                length="8"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className=" border b  sm:text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 border-zinc-900 bg-zinc-900 text-white"
              />
            </div>

            <div className="flex items-start">
              <Link href="#" className="text-sm text-orange-700 hover:underline ml-auto dark:text-blue-600">Forgot password?</Link>
            </div>

            <button
              type="submit"
              onClick={onSubmit}
              className="w-full text-white hover:bg-orange-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600"
            >
              Login to your account
            </button>

            <div className="text-sm font-medium  text-white">Not registered?&nbsp;
              <Link href="/auth/signup" className=" hover:underline dark: text-blue-600">Create account</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}



