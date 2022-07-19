import React, { useEffect, useRef, useState } from "react";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./LoginAndSignUp.css";
import { useDispatch, useSelector } from "react-redux";
import { clearError, login, register } from "../../actions/userAction";
import { useAlert } from "react-alert";
import Loader from "../../Loader/Loader";
const LoginAndSignUp = () => {
  const dispatch = useDispatch();
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const alert = useAlert();
  const location = useLocation();
  const history = useHistory();
  const [addClass, setAddClass] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;
  const [avatar, setAvatar] = useState("/Profile.png");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const loginTab = useRef(null);
  const registerTab = useRef(null);

  ///login____submit
  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };
  //  register
  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    dispatch(register(myForm));
  };
  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const redirect = location.search ? location.search.split("=")[1] : "/account";
  useEffect(() => {
    if (error) {
      alert.error("Your email is not authenticated");
      dispatch(clearError());
    }

    if (isAuthenticated) {
      history.push(redirect);
    }
  }, [dispatch, error, alert, history, isAuthenticated, redirect]);
  return (
    <>
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <div className={`login-signUp ${addClass}`} id="container">
          <div className="form-container  sign-up-container">
            <div>
              <form
                ref={registerTab}
                encType="multipart/form-data"
                onSubmit={registerSubmit}
              >
                <div className="create-account">
                  <h1>Create Account</h1>
                </div>

                <input
                  type="text"
                  placeholder="NAME"
                  name="name"
                  value={name}
                  onChange={registerDataChange}
                  required
                />
                <input
                  type="email"
                  placeholder="EMAIL"
                  name="email"
                  value={email}
                  onChange={registerDataChange}
                  required
                />
                <input
                  type="password"
                  placeholder="PASSWORD"
                  name="password"
                  value={password}
                  onChange={registerDataChange}
                  required
                />
                <div id="registerImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                  />
                </div>
                <button type="submit">REGISTER</button>
              </form>
            </div>
          </div>
          <div className="form-container sign-in-container">
            <div>
              <form ref={loginTab} onSubmit={loginSubmit}>
                <h1>Login</h1>
                <input
                  type="email"
                  placeholder="EMAIL"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="PASSWORD"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
                <div className="login-n-forgot-password">
                  <Link to="/password/forgot">Forgot Password</Link>
                </div>
                <button type="submit" className="button-customize">
                  LOGIN
                </button>
              </form>
            </div>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <button
                  className="ghost"
                  id="signIn"
                  onClick={() => setAddClass("")}
                >
                  GO TO LOGIN
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <button
                  className="ghost"
                  id="signUp"
                  onClick={() => setAddClass("right-panel-active")}
                >
                  GO TO REGISTER
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginAndSignUp;
