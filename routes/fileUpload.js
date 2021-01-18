const express = require("express");
const router = express.Router();
const Files = require("../models/Files");

//connect to stream gfs
const mongoose = require("mongoose");
const upload = require("../utils/imageStorage");
const connect = mongoose.createConnection(process.env.MONGO_URI);
let gfs;
connect.once("open", () => {
  // initialize stream
  gfs = new mongoose.mongo.GridFSBucket(connect.db, {
    bucketName: "uploads",
  });
});
//connect to stream gfs

router.post("/api/v1/uploads", upload.any("file"), async (req, res) => {
  try {
    const newFile = await Files.create(req.body);

    return res.status(201).send(newFile);
  } catch (err) {
    console.log(err);
  }
  //   res.status(201).send(req.file);
  res.status(201).send(req.body);
});

router.get("/api/v1/uploads/:filename", async (req, res) => {
  try {
    // const files = await gfs.find({ filename: req.params.filename });

    // if (!files) {
    //   return res.status(404).send();
    // }

    //check later
    if (req.params.filename !== "undefined") {
      //load and display image
      gfs.openDownloadStreamByName(req.params.filename).pipe(res);
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
