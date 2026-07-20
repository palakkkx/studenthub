import { useState } from "react";
import { supabase } from "../supabase";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignup() {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Account created successfully!");
    console.log(data);

    setEmail("");
    setPassword("");
  }

  return (
    <div className="welcome">
      <h1>Create Account 📝</h1>

      <div className="post-form">

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleSignup}>
          Sign Up
        </button>

      </div>
    </div>
  );
}

export default Signup;