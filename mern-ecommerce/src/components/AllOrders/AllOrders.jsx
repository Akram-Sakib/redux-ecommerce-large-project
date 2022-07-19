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
import { DELETE_ORDER_RESET } from "../../constants/orderConstant";
import {
  clearError,
  deleteOrder,
  getAllOrders,
} from "../../actions/orderAction";

const AllOrder = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const history = useHistory();
  const { error, orders } = useSelector((state) => state.allOrders);
  const { error: deleteError, isDeleted } = useSelector((state) => state.order);
  ///delete product
  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
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
      alert.success("order deleted successfully");
      history.push("/admin/orders");
      dispatch({ type: DELETE_ORDER_RESET });
    }

    dispatch(getAllOrders());
  }, [dispatch, error, alert, deleteError, history, isDeleted]);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 200, flex: 0.7 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 100,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(
          params.id,
          "status" === "Delivered" ? "#DDD" : "black"
        );
      },
    },
    {
      field: "quantity",
      headerName: "Quantity",
      minWidth: 300,
      flex: 1,
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "amount",
      headerName: "Amount",
      minWidth: 300,
      flex: 1,
      type: "number",
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
            <Link to={`/admin/order/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

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
  orders &&
    orders.forEach((item, index) => {
      rows.push({
        quantity: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });

  // const columns = [
  //   { field: "id", headerName: "product ID", minWidth: 200, flex: 0.5 },
  //   {
  //     field: "name",
  //     headerName: "Name",
  //     minWidth: 100,
  //     flex: 0.5,
  //   },
  //   {
  //     field: "price",
  //     headerName: "Price",
  //     minWidth: 300,
  //     flex: 1,
  //     minWidth: 150,
  //     flex: 0.3,
  //   },
  //   {
  //     field: "actions",
  //     flex: 0.3,
  //     headerName: "Actions",
  //     minWidth: 150,
  //     type: "number",
  //     sortable: false,
  //     renderCell: (params) => {
  //       return (
  //         <>
  //           <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
  //             <EditIcon />
  //           </Link>

  //           <Button
  //             onClick={() =>
  //               deleteProductHandler(params.getValue(params.id, "id"))
  //             }
  //           >
  //             <DeleteIcon />
  //           </Button>
  //         </>
  //       );
  //     },
  //   },
  // ];
  // const rows = [];
  // orders &&
  //   orders.forEach((item) => {
  //     rows.push({
  //       id: item._id,
  //       name: item.name,
  //       price: item.price,
  //     });
  //   });
  return (
    <>
      <MetaData title={`all orders showed by - admin`} />
      <DashboardSidebar />
      <div className="order-of-user mb-5 pb-5">
        <div className="products___item">
          <h1>all orders</h1>
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

export default AllOrder;
