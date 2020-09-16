import axios from "axios";

export default async function checkPaginationLength(limit, search) {
  try {
    const pageNumbers = [];

    const res = await axios.get(
      `http://localhost:5000/api/v1/products?search=${search}`
    );

    for (let i = 1; i <= Math.ceil(res.data.length / limit); i++) {
      pageNumbers.push(i);
    }

    return pageNumbers.length;
  } catch (e) {
    console.log(e);
  }
}
