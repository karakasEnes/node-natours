const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());

const toursData = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.use((req, res, next) => {
  console.log("hello from global middleWare");
  next();
});

app.use((req, res, next) => {
  console.log("hello from middleware of isoString");
  const createdAt = new Date().toISOString();
  req.isoDateString = createdAt;
  next();
});

const getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    result: toursData.length,
    data: {
      tours: toursData,
    },
  });
};

const getTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = toursData.find((el) => el.id === id);

  if (!tour) {
    return res.status(404).json({
      status: "fail",
      message: "There is no tour found!.",
    });
  }

  res.status(200).json({
    middlewareProperty: req.isoDateString,
    status: "success",
    tour,
  });
};

const updateTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = toursData.find((el) => el.id === id);

  if (!tour) {
    return res.status(404).json({
      status: "fail",
      message: "Cannot get tour!",
    });
  }

  res.status(200).json({
    status: "success",
    tour: "Updated tour here",
  });
};

const deleteTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = toursData.find((el) => el.id === id);

  if (!tour) {
    return res.status(404).json({
      status: "fail",
      message: "Cannot delete that not exists!",
    });
  }

  res.status(200).json({
    status: "success",
    data: null,
  });
};

const createTour = (req, res) => {
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
};

app.route("/api/v1/tours").get(getAllTours).post(createTour);

app
  .route("/api/v1/tours/:id")
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

const port = 3000;

app.listen(port, () => {
  console.log(`App listenin at port ${port}`);
});
