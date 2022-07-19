import React, { useEffect, useState } from "react";
import videoOne from "../../video/subscribe.mp4";
import SendIcon from "@mui/icons-material/Send";
import "./Subscribe.css";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useHistory } from "react-router-dom";
import { clearError, createSubscribe } from "../../actions/subscribeAction";
import { NEW_SUBSCRIBE_RESET } from "../../constants/subscribeConstant";
const Subscribe = () => {
  const { loading, error, success } = useSelector((state) => state.webReview);
  const dispatch = useDispatch();
  const alert = useAlert();
  const history = useHistory();
  const [email, setEmail] = useState("");
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    if (success) {
      history.push("/");
      dispatch({ type: NEW_SUBSCRIBE_RESET });
    }
  }, [dispatch, error, success, alert, history]);

  const createSubscribeSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("email", email);
    dispatch(createSubscribe(myForm));
  };
  function refreshPage() {
    setTimeout(() => {
      alert.success("thank you for subscribe");
    }, 2000);
  }
  return (
    <>
      <div className="video-section">
        <video src={videoOne} muted loop autoPlay></video>
        <div className="white-overly">
          <div className="form-section">
            <h1>Subscribe our website and Become a member of our website</h1>
            <form onSubmit={createSubscribeSubmitHandler}>
              <div className="form">
                <input
                  type="email"
                  placeholder="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" onClick={refreshPage}>
                  <SendIcon />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Subscribe;
