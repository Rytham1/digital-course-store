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
    <div>
      <h1>Auth Test (No Email Confirm)</h1>

      <input
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={signUp}>Sign Up</button>
      <button onClick={signIn}>Sign In</button>

      <p>{message}</p>
    </div>
  )
}
