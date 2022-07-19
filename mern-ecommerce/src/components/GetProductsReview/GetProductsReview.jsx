import React, { useEffect, useState } from "react";
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
  clearError,
  deleteProductReview,
  getAllProductReview,
} from "../../actions/productAction";
import { DELETE_REVIEW_RESET } from "../../constants/productConstants";

const GetProductsReview = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const history = useHistory();
  const { error, reviews } = useSelector((state) => state.productReview);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.review
  );
  ///delete product
  const [productId, setProductId] = useState("");
  const deleteReviewHandler = (reviewId) => {
    dispatch(deleteProductReview(reviewId, productId));
  };

  const productReviewsSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllProductReview(productId));
  };

  useEffect(() => {
    if (productId.length === 24) {
      dispatch(getAllProductReview(productId));
    }
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
      history.push("/admin/reviews");
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [dispatch, error, alert, deleteError, history, isDeleted, productId]);

  const columns = [
    { field: "id", headerName: "REVIEW ID", minWidth: 200, flex: 0.7 },
    {
      field: "user",
      headerName: "User",
      minWidth: 100,
      flex: 0.5,
    },
    {
      field: "comment",
      headerName: "Comment",
      minWidth: 300,
      flex: 1,
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWidth: 180,
      flex: 0.4,

      cellClassName: (params) => {
        return params.getValue(params.id, "rating") >= 3
          ? "greenColor"
          : "redColor";
      },
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
                deleteReviewHandler(params.getValue(params.id, "id"))
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
        id: item._id,
        user: item.name,
        comment: item.comment,
        rating: item.rating,
      });
    });
  return (
    <>
      <MetaData title={`all products reviews`} />
      <DashboardSidebar />
      <>
        {reviews.length === 0 && (
          <div className="reviews-container">
            <form onSubmit={productReviewsSubmitHandler}>
              {" "}
              <h1 className="pt-4">Search Review</h1>
              <div className="product-single-input">
                <input
                  type="text"
                  required
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                  placeholder="product ID"
                  className="margin-right"
                />
              </div>
            </form>
          </div>
        )}
      </>
      {reviews && reviews.length > 0 ? (
        <div className="order-of-user mb-5 pb-5">
          <div className="products___item">
            <h1>get product review</h1>
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
      ) : (
        <div className="review_not_found">
          <p> please search with product _ID</p>
        </div>
      )}
    </>
  );
};

export default GetProductsReview;
