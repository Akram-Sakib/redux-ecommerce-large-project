import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { DataGrid } from "@material-ui/data-grid";
import DashboardSidebar from "../Dashboard/DashboardSidebar/DashboardSidebar";
import MetaData from "../MetaData/MetaData";
import { deleteUser, getAllUser } from "../../actions/userAction";
import { clearError } from "../../actions/userAction";
import { DELETE_USER_RESET } from "../../constants/userConstants";
const Users = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const history = useHistory();
  const { error, users } = useSelector((state) => state.allUsers);
  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.profile);
  ///delete product
  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };
  // /
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearError());
    }
    if (isDeleted) {
      alert.success("user deleted successfully");
      history.push("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }
    dispatch(getAllUser());
  }, [dispatch, error, alert, deleteError, history, isDeleted]);
  const columns = [
    { field: "id", headerName: "product ID", minWidth: 110, flex: 0.5 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 100,
      flex: 0.3,
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 300,
      flex: 1,
      minWidth: 200,
      flex: 0.5,
    },
    {
      field: "role",
      headerName: "Role",
      minWidth: 300,
      flex: 1,
      minWidth: 100,
      flex: 0.3,
    },
    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/admin/update-user/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteUserHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </>
        );
      },
    },
  ];
  const rows = [];
  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        name: item.name,
        email: item.email,
        role: item.role,
      });
    });
  return (
    <>
      <MetaData title={`all user showed by - admin`} />
      <DashboardSidebar />
      <div className="order-of-user mb-5 pb-5">
        <div className="products___item">
          <h1>all users</h1>
        </div>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          className="my-order-table"
          autoHeight
        />
      </div>
    </>
  );
};

export default Users;
