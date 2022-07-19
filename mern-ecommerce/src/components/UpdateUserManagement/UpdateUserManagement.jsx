import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import {
  clearError,
  getUserDetails,
  updateUser,
} from "../../actions/userAction";
import { UPDATE_USER_RESET } from "../../constants/userConstants";
import DashboardSidebar from "../Dashboard/DashboardSidebar/DashboardSidebar";
import MetaData from "../MetaData/MetaData";
import "./UpdateUserManagement.css";
const UpdateUserManagement = () => {
  const alert = useAlert();
  const history = useHistory();
  const match = useRouteMatch();
  const userId = match.params.id;
  const { user, error, loading } = useSelector((state) => state.userDetails);
  const { error: updateError, isUpdated } = useSelector(
    (state) => state.profile
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const dispatch = useDispatch();

  ///
  useEffect(() => {
    if (user && user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearError());
    }
    if (isUpdated) {
      alert.success("user updated successfully");
      history.push("/admin/users");
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [
    dispatch,
    error,
    updateError,
    alert,
    match.params.id,
    isUpdated,
    history,
    user,
    userId,
  ]);
  const updateRoleUser = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("role", role);
    dispatch(updateUser(userId, myForm));
  };
  return (
    <>
      <MetaData title="USER STATUS CHANGE" />
      <DashboardSidebar />

      <div className="add-product need-padding-for-uploading-product">
        <form onSubmit={updateRoleUser}>
          <h1 className="pt-5">Update User</h1>
          <div className="admin-make">
            <input
              type="text"
              placeholder="Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />{" "}
          </div>
          <div className="admin-make">
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="admin-make">
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="">Select roles</option>
              <option value="user">user</option>
              <option value="admin">admin</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={loading ? true : false || role === "" ? true : false}
            className="mt-3"
          >
            UPDATE USER
          </button>
        </form>
      </div>
    </>
  );
};
export default UpdateUserManagement;
