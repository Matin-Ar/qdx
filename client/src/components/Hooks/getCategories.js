import axios from "axios";

export const getCategories = async () => {
  fetch("api/categories").then((res) => res.json());
};
