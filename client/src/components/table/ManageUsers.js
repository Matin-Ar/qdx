import React, { useEffect, useMemo, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";
import { useQuery } from "react-query";
import Loader from "../Loader";
import deleteIMG from "../../assets/delete.png";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function ManageUsers() {
  const useFetchUsers = () => {
    return useQuery("users", () => {
      return axios.get("/users/profiles").then((res) => res.data);
    });
  };
  const users = useFetchUsers();

  const handleDeleteUser = (e, id) => {
    e.preventDefault();
    axios
      .delete("/users/profiles", { data: { id } })
      .then((res) => {
        alertify.success("کاربر با موفقیت حذف شد");
      })
      .catch((err) => {
        alertify.error("عملیات حذف کاربر با مشکل مواجه شد");
        console.log(err);
      });
  };

  const classes = useStyles();

  return (
    <div className="tablepage-wrapper user-wrapper">
      <div className="table-container  user-container">
        {users.isLoading && <Loader />}
        {users.isSuccess && (
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="right">تصویر کاربر</TableCell>

                  <TableCell align="right">ایمیل کاربر</TableCell>
                  <TableCell align="center">id</TableCell>
                  <TableCell align="right">حذف</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.data.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell align="right" component="th" scope="row">
                      <img
                        className="users-table-avatar"
                        src={`/users/${item._id}/avatar`}
                      ></img>
                    </TableCell>
                    <TableCell align="right">{item.email}</TableCell>

                    <TableCell align="center" component="th" scope="row">
                      {item._id}
                    </TableCell>

                    <TableCell align="right">
                      <button
                        className="delete-button-table"
                        onClick={(e) => handleDeleteUser(e, item._id)}
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
