import axios from "axios";
import urlBasic from "./UrlVar";

export default async function checkPaginationLength(limit, search) {
  try {
    const pageNumbers = [];

    const res = await axios.get(`${urlBasic}/api/v1/products?search=${search}`);

    for (let i = 1; i <= Math.ceil(res.data.length / limit); i++) {
      pageNumbers.push(i);
    }

    return pageNumbers.length;
  } catch (e) {
    console.log(e);
  }
}
