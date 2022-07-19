import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Loader/Loader";
import MetaData from "../MetaData/MetaData";
import Navbar from "../Navbar/Navbar";
import { clearError, forgotPasswordUpdate } from "../../actions/userAction";
import { useHistory } from "react-router-dom";

const ForgotPasswordAuthentication = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );
  const alert = useAlert();
  const [email, setEmail] = useState("");

  ///
  const forgotPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("email", email);
    dispatch(forgotPasswordUpdate(myForm));
  };

  ///
  useEffect(() => {
    if (error) {
      alert.error("your email is not authenticated");
      dispatch(clearError());
    }
    if (message) {
      alert.success(message);
      history.push("/login");
    }
  }, [dispatch, error, alert, message, history]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div>
            <MetaData title="Update Profile" />
            <Navbar />
            {loading ? (
              <Loader />
            ) : (
              <div className="user___profile___update">
                <form onSubmit={forgotPasswordSubmit}>
                  <h1>update forgot password</h1>

                  <input
                    type="email"
                    placeholder="EMAIL"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />

                  <button type="submit">SEND</button>
                </form>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default ForgotPasswordAuthentication;
