"use client"
import { useState } from "react"
import { supabase } from "../lib/supabaseClient"

export default function AuthPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")

  async function signUp() {
    const { data, error } = await supabase.auth.signUp({ email, password })
    setMessage(error ? error.message : `Signed up as ${data.user?.email}`)
  }

  async function signIn() {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    setMessage(error ? error.message : `Signed in as ${data.user?.email}`)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Auth Test</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex gap-2">
          <button
            onClick={signUp}
            className="w-1/2 bg-gray-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Sign Up
          </button>
          <button
            onClick={signIn}
            className="w-1/2 bg-blue-500 text-white py-2 rounded-lg hover:bg-green-600"
          >
            Sign In
          </button>
        </div>

        {message && (
          <p className="mt-4 text-center text-sm text-gray-600">{message}</p>
        )}
      </div>
    </div>
  )
}
