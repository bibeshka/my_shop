const express = require("express");
const router = express.Router();
const Files = require("../models/Files");
const mongoose = require("mongoose");

const upload = require("../utils/imageStorage");
const { route } = require("./products");

const connect = mongoose.createConnection(process.env.MONGO_URI);

let gfs;

connect.once("open", () => {
  // initialize stream
  gfs = new mongoose.mongo.GridFSBucket(connect.db, {
    bucketName: "uploads",
  });
});

router.post("/api/v1/uploads", upload.single("file"), async (req, res) => {
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
  //   const imagename = req.params.filename;
  try {
    const files = await gfs.find({ filename: req.params.filename });

    if (!files) {
      return res.status(404).send();
    }

    //load and display image
    gfs.openDownloadStreamByName(req.params.filename).pipe(res);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
