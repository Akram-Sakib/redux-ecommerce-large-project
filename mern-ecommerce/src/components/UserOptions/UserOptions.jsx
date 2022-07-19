import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import "./UserOptions.css";
import { useRadioGroup } from "@mui/material";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { logout } from "../../actions/userAction";

const UserOptions = ({ user }) => {
  console.log("user", user);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 0,
    p: 4,
  };

  ////
  const history = useHistory();
  const dispatch = useDispatch();
  const alert = useAlert();
  //

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const options = [
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    { icon: <PersonIcon />, name: "Profile", func: account },
    { icon: <ExitToAppIcon />, name: "Logout", func: logOutUser },
  ];

  function dashboard() {
    history.push("/dashboard");
  }
  function orders() {
    history.push("/orders");
  }
  function account() {
    history.push("/account");
  }

  function cart() {
    history.push("/Cart");
  }

  function logOutUser() {
    dispatch(logout());
    alert.success("Logout Successfully");
    history.push("/");
  }
  return (
    <div className="user-profile-item">
      <div className="button-customize-for-modal">
        <button onClick={handleOpen}>
          <img src={user?.avatar?.url} alt="" />
        </button>
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <div className="user-profile-setup">
              <img src={user?.avatar?.url} alt="" />
              <h5>{user?.name}</h5>
            </div>
            <div className="user-activities">
              {user?.role === "admin" ? (
                <>
                  <DashboardIcon onClick={dashboard} tooltipTitle="Dashboard" />
                  <PersonIcon onClick={account} tooltipTitle="Account" />
                  <ListAltIcon onClick={orders} tooltipTitle="Orders" />
                  <ShoppingCartIcon onClick={cart} tooltipTitle="Cart" />
                  <ExitToAppIcon onClick={logOutUser} tooltipTitle="LogOut" />
                </>
              ) : (
                <>
                  <PersonIcon onClick={account} tooltipTitle="Account" />
                  <ListAltIcon onClick={orders} tooltipTitle="Orders" />
                  <ShoppingCartIcon onClick={cart} tooltipTitle="Cart" />
                  <ExitToAppIcon onClick={logOutUser} tooltipTitle="LogOut" />
                </>
              )}
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default UserOptions;
