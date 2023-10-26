import { useState } from "react";

function Login() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <div className="bg-red-500 w-full h-screen">
      <h1>hello</h1>
      <form>
        <input type="email" placeholder="Hello" />
        <input type="password" />
      </form>
    </div>
  );
}

export { Login };
