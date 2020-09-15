import axios from "axios";

export default async function checkPaginationLength(limit) {
  try {
    const pageNumbers = [];

    const res = await axios.get(`http://localhost:5000/api/v1/products`);

    for (let i = 1; i <= Math.ceil(res.data.length / limit); i++) {
      pageNumbers.push(i);
    }

    // console.log(res);
    // console.log(pageNumbers);

    return pageNumbers.length;
  } catch (e) {
    console.log(e);
  }
}
