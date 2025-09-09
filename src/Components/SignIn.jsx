import { useState } from "react";

const SignIn = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const handleLogin = (e) => {
    e.preventDefault();
    console.log(user);
  };
  return (
    <div className="hero min-h-screen flex items-center justify-center">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <form onSubmit={handleLogin} className="fieldset">
            <label className="label">Email</label>
            <input
              onChange={handleChange}
              type="email"
              className="input"
              placeholder="Email"
              name="email"
            />
            <label className="label">Password</label>
            <input
              onChange={handleChange}
              type="password"
              className="input"
              placeholder="Password"
              name="password"
            />
            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <div className="relative mb-1">
              {error && (
                <p className="absolute font-bold text-red-600">hello</p>
              )}{" "}
            </div>
            <button className="btn btn-neutral mt-4">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
