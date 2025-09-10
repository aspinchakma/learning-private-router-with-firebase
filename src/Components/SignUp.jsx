import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase.init";

const SignUp = () => {
  const [error, setError] = useState("");
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "password") {
      if (!/(?=.*[a-z])/.test(value)) {
        setError("at least one lower case");
      } else if (!/(?=.*[A-Z])/.test(value)) {
        setError("at least one upper case");
      } else if (!/(?=.*\d)/.test(value)) {
        setError("at least one digit");
      } else if (!/(?=.*[!@#$%^&*(),.?":{}|<>])/.test(value)) {
        setError("at least one Special characters");
      } else if (!/[a-zA-Z0-9]{8,}/.test(value)) {
        setError("at least 8 characters");
      } else {
        setError("");
      }
    }
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleRegisterForm = (e) => {
    e.preventDefault();
    // clearing all field
    if (error.length) {
      e.target.password.focus();
      return;
    }
    setError("");
    // creating user
    createUserWithEmailAndPassword(auth, userInfo.email, userInfo.password)
      .then(() => {
        // updating current user information
        updateProfile(auth.currentUser, { displayName: userInfo.name })
          .then(() => {})
          .catch((err) => {
            setError(err.code);
          });
      })
      .catch((err) => {
        if (err.code === "auth/email-already-in-use") {
          setError("Email Already Existed!");
          e.target.email.focus();
        }
      });
  };
  return (
    <div className="hero min-h-screen flex items-center justify-center">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <form onSubmit={handleRegisterForm} className="fieldset">
            <label className="label">Full Name</label>
            <input
              onChange={handleChange}
              type="text"
              className="input"
              placeholder="Full Name"
              name="name"
              required
            />
            <label className="label">Email</label>
            <input
              onChange={handleChange}
              type="email"
              className="input"
              placeholder="Email"
              name="email"
              required
            />
            <label className="label">Password</label>
            <input
              onChange={handleChange}
              type="password"
              className="input"
              placeholder="Password"
              name="password"
              required
            />
            <div className="relative mb-1">
              {error && (
                <p className="absolute font-bold text-red-600">{error}</p>
              )}{" "}
            </div>
            <button className="btn btn-neutral mt-4">Login</button>
          </form>
          <p className="text-center">
            Already have an account?{" "}
            <Link to={`/signin`} className={`font-bold underline`}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
