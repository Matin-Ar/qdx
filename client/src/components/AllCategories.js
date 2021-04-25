/* eslint-disable jsx-a11y/anchor-is-valid */
import { useQuery, useQueries } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { getCategories } from "./Hooks/getCategories";

function AllCategories() {
  const categories = useQuery("categories", () => {
    return axios.get("/categories").then((res) => res.data);
  });

  console.log(categories);

  return categories.isLoading ? (
    "LOADING .... "
  ) : (
    <>
      <ReactQueryDevtools />

      <div> {categories.data?.map((item) => item.name)} </div>
    </>
  );
}

export default AllCategories;
