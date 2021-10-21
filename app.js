const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());

const toursData = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

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

// app.get("/api/v1/tours", getAllTours);
// app.get("/api/v1/tours/:id", getTour);
// app.patch("/api/v1/tours/:id", updateTour);
// app.delete("/api/v1/tours/:id", deleteTour);
// app.post("/api/v1/tours", createTour);

app.route("/api/v1/tours").get(getAllTours).post(createTour);

app
  .route("/api/v1/tours/:id")
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

app.get("/", (req, res) => {
  res.status(200).send("get works");
});

const port = 3000;

app.listen(port, () => {
  console.log(`App listenin at port ${port}`);
});
