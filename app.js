const express = require("express");
const fs = require("fs");
const app = express();

const toursData = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours.json`)
);

app.get("/api/v1/tours", (req, res) => {
  res.status(200).json({
    status: "success",
    result: toursData.length,
    data: {
      tours: toursData,
    },
  });
});

app.get("/", (req, res) => {
  res.status(200).send("get works");
});

const port = 3000;

app.listen(port, () => {
  console.log(`App listenin at port ${port}`);
});
