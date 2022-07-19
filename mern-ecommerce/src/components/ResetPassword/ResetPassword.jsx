import React, { useEffect, useRef, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  loadUSer,
  resetPassword,
  updatePassword,
  updateProfile,
} from "../../actions/userAction";
import { useAlert } from "react-alert";
import Loader from "../../Loader/Loader";
import MetaData from "../MetaData/MetaData";

const ResetPassword = ({ history, match }) => {
  const dispatch = useDispatch();
  const { error, success, loading } = useSelector(
    (state) => state.forgotPassword
  );
  const alert = useAlert();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  ////
  const reSetPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);
    dispatch(resetPassword(match.params.token, myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    if (success) {
      alert.success("Password reset successfully");
      history.push("/login");
    }
  }, [dispatch, error, alert, history, success]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div>
            <MetaData title="Update Password" />
            <Navbar />
            {loading ? (
              <Loader />
            ) : (
              <div className="user___password___update">
                <form onSubmit={reSetPasswordSubmit}>
                  <h1>update password</h1>

                  <input
                    type="password"
                    placeholder="NEW PASSWORD"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <input
                    type="password"
                    placeholder="CONFIRM PASSWORD"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <button type="submit">CHANGE PASSWORD</button>
                </form>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default ResetPassword;
