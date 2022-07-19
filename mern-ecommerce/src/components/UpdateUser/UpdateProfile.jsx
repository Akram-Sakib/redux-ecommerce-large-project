import React, { useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./UpdateUser.css";
import { useDispatch, useSelector } from "react-redux";
import { clearError, loadUser, updateProfile } from "../../actions/userAction";
import { useAlert } from "react-alert";
import Loader from "../../Loader/Loader";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import MetaData from "../MetaData/MetaData";

const UpdateProfile = ({ history }) => {
  const dispatch = useDispatch((state) => state.user);
  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);
  const alert = useAlert();
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  ////
  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    console.log("myForm", myForm);
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);
    dispatch(updateProfile(myForm));
  };

  const updateDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user?.avatar?.url);
    }
    if (error) {
      alert.error("your is email not authenticated");
      dispatch(clearError());
    }
    if (isUpdated) {
      alert.success("Profile updated successfully");
      dispatch(loadUser());
      history.push("/account");
      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, error, alert, history, user, isUpdated]);
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
                <form encType="multipart/form-data" onSubmit={registerSubmit}>
                  <h1>update profile</h1>
                  <input
                    type="text"
                    placeholder="NAME"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />{" "}
                  <br />
                  <input
                    type="email"
                    placeholder="EMAIL"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <div id="registerImage">
                    <img src={avatarPreview} alt="Avatar Preview" />
                    <input
                      type="file"
                      name="avatar"
                      accept="image/*"
                      onChange={updateDataChange}
                    />
                  </div>
                  <button type="submit">UPDATE PROFILE</button>
                </form>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default UpdateProfile;
