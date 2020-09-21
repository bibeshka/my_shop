let urlBasic = "";

if (process.env.NODE_ENV === "development") {
  urlBasic = "http://localhost:5000";
}

export default urlBasic;
