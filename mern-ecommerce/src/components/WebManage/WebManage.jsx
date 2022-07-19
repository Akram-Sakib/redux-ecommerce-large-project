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
import {
  getAllReviews,
  clearError,
  deleteWebReview,
} from "../../actions/reviewAction";
import { DELETE_RESET_WEB } from "../../constants/reviewConstants";

const WebManage = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const history = useHistory();
  const { error, reviews } = useSelector((state) => state.peopleReview);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.deleteReview
  );
  ///delete product
  const deleteOrderHandler = (id) => {
    dispatch(deleteWebReview(id));
  };

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
      alert.success("review deleted successfully");
      history.push("/admin/webReviews");
      dispatch({ type: DELETE_RESET_WEB });
    }

    dispatch(getAllReviews());
  }, [dispatch, error, alert, deleteError, history, isDeleted]);

  const columns = [
    { field: "id", headerName: "Reviewer ID", minWidth: 200, flex: 0.7 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 100,
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 300,
      flex: 1,
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "description",
      headerName: "Description",
      minWidth: 300,
      flex: 1,
      minWidth: 150,
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
            <Button
              onClick={() =>
                deleteOrderHandler(params.getValue(params.id, "id"))
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
  ///
  reviews &&
    reviews.forEach((item, index) => {
      rows.push({
        name: item.name,
        id: item._id,
        email: item.email,
        description: item.description,
      });
    });

  return (
    <>
      <MetaData title={`all orders showed by - admin`} />
      <DashboardSidebar />
      <div className="order-of-user mb-5 pb-5">
        <div className="products___item">
          <h1>all web reviews</h1>
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

export default WebManage;
