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
import "./ShowProductsByAdmin.css";
import {
  clearError,
  deleteProduct,
  getAdminProduct,
} from "../../actions/productAction";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";

const ShowProductsByAdmin = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const history = useHistory();
  const { error, products } = useSelector((state) => state.products);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );
  ///delete product
  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
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
      alert.success("product deleted successfully");
      history.push("/admin/products");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }

    dispatch(getAdminProduct());
  }, [dispatch, error, alert, deleteError, history, isDeleted]);
  const columns = [
    { field: "id", headerName: "product ID", minWidth: 200, flex: 0.5 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 100,
      flex: 0.5,
    },
    {
      field: "price",
      headerName: "Price",
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
            <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteProductHandler(params.getValue(params.id, "id"))
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
  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        name: item.name,
        price: item.price,
      });
    });
  return (
    <>
      <MetaData title={`all products showed by - admin`} />
      <DashboardSidebar />
      <div className="order-of-user mb-5 pb-5">
        <div className="products___item">
          <h1>all products</h1>
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

export default ShowProductsByAdmin;
