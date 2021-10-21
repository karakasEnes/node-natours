const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());

const toursData = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
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

app.post("/api/v1/tours", (req, res) => {
  const tourID = toursData[toursData.length - 1].id + 1;
  const newTour = Object.assign({ id: tourID }, req.body);
  toursData.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(toursData),
    (err) => {
      if (err) res.status(505).send("Error happened while writing to the data");
      res.status(201).send(newTour);
    }
  );
});

app.get("/", (req, res) => {
  res.status(200).send("get works");
});

const port = 3000;

app.listen(port, () => {
  console.log(`App listenin at port ${port}`);
});
