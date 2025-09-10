import {
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Auth/Context";
import { auth } from "../firebase.init";

const SignIn = () => {
  const [error, setError] = useState("");
  const { setUser } = useContext(AuthContext);
  const [userSignInInfo, setUserSignInInfo] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserSignInInfo({ ...userSignInInfo, [name]: value });
  };
  const handleLogin = (e) => {
    e.preventDefault();

    // clearing erro
    setError("");
    signInWithEmailAndPassword(
      auth,
      userSignInInfo.email,
      userSignInInfo.password
    )
      .then((result) => {
        // send verification
        if (!result.user.emailVerified) {
          sendEmailVerification(auth.currentUser);
          setError("Please Verify Your Email Then login");
        } else {
          setUser(result.user);
        }
      })
      .catch((err) => setError(err.code));
  };

  const handlePasswordReset = () => {
    sendPasswordResetEmail(auth, userSignInInfo.email).then(() => {
      setError("Password reset email sent!");
    });
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
            <div>
              <a onClick={handlePasswordReset} className="link link-hover">
                Forgot password?
              </a>
            </div>
            <div className="relative mb-1">
              {error && (
                <p className="absolute font-bold text-red-600">{error}</p>
              )}{" "}
            </div>
            <button className="btn btn-neutral mt-4">Login</button>
          </form>
          <p className="text-center">
            Dont Have an account?{" "}
            <Link to={`/signup`} className={`font-bold underline`}>
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
