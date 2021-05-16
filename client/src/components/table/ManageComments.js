import axios from "axios";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";
import { useQuery, useQueryClient } from "react-query";
import Loader from "../Loader";
import deleteIMG from "../../assets/delete.png";
import approvalIMG from "../../assets/approval.png";

function ManageComments() {
  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

  const classes = useStyles();

  const useFetchComments = () => {
    return useQuery("comments", () => {
      return axios.get("/comments").then((res) => {
        return res.data;
      });
    });
  };
  const comments = useFetchComments();
  const queryClient = useQueryClient();

  const handleDeleteComment = (e, id) => {
    e.preventDefault();

    axios
      .delete("/comments", { data: { id } })
      .then((res) => {
        alertify.warning("با موفقیت حذف گردید");
        queryClient.invalidateQueries("comments");
      })
      .catch((err) => console.log(err));
  };

  const handleApproveComment = (e, id) => {
    e.preventDefault();

    axios
      .patch("/comments", {
        id,
        condition: true,
      })
      .then((res) => {
        alertify.success("با موفقیت تایید گردید");
        queryClient.invalidateQueries("comments");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="tablepage-wrapper user-wrapper">
      <div className="table-container  user-container">
        {comments.isLoading && <Loader />}
        {comments.isSuccess && (
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="right">تصویر کاربر</TableCell>

                  <TableCell align="right">نام کاربر </TableCell>
                  <TableCell align="center">عنوان دیدگاه</TableCell>
                  <TableCell align="center">متن دیدگاه</TableCell>

                  <TableCell align="center">عملیات دیدگاه ها</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {comments.data?.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell align="right" component="th" scope="row">
                      <img
                        className="users-table-avatar"
                        src={`/users/${item.user}/avatar`}
                      ></img>
                    </TableCell>

                    <TableCell align="right" component="th" scope="row">
                      {item.name}
                    </TableCell>

                    <TableCell align="center" component="th" scope="row">
                      {item.title}
                    </TableCell>

                    <TableCell align="center" component="th" scope="row">
                      {item.desc}
                    </TableCell>

                    <TableCell align="center">
                      <button
                        className="delete-button-table"
                        onClick={(e) => handleApproveComment(e, item._id)}
                      >
                        <img
                          className="edit-image-table"
                          src={approvalIMG}
                        ></img>
                      </button>
                      <button
                        className="delete-button-table"
                        onClick={(e) => handleDeleteComment(e, item._id)}
                      >
                        <img className="edit-image-table" src={deleteIMG}></img>
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </div>
  );
}

export default ManageComments;
