import axios from "axios";

export const getCategories = async () => {
  fetch("/categories").then((res) => res.json());
};
