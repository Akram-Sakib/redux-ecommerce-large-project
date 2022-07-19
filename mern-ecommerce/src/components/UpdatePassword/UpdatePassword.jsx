import React, { useEffect, useRef, useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./UpdatePassword.css";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  loadUSer,
  updatePassword,
  updateProfile,
} from "../../actions/userAction";
import { useAlert } from "react-alert";
import Loader from "../../Loader/Loader";
import MetaData from "../MetaData/MetaData";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";

const UpdatePassword = ({ history }) => {
  const dispatch = useDispatch();
  const { error, isUpdated, loading } = useSelector((state) => state.profile);
  const alert = useAlert();
  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  ////
  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);
    dispatch(updatePassword(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(" not authenticated");
      dispatch(clearError());
    }
    if (isUpdated) {
      alert.success("Password updated successfully");
      history.push("/account");
      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, error, alert, history, isUpdated]);
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
                <form onSubmit={registerSubmit}>
                  <h1>update password</h1>

                  <input
                    type="password"
                    placeholder="OLD PASSWORD"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                  <input
                    type="password"
                    placeholder="NEW PASSWORD"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
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

export default UpdatePassword;
