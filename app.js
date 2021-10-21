const express = require("express");
const fs = require("fs");
const app = express();

const toursData = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// 1) MIDDLEWARES

app.use(express.json());

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

// 2) ROUTER HANDLERS

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

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "this route is not yet defined",
  });
};

const createUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "this route is not yet defined",
  });
};

const getUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "this route is not yet defined",
  });
};

const updateUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "this route is not yet defined",
  });
};

const deleteUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "this route is not yet defined",
  });
};

// 3) ROUTERS

const tourRouter = express.Router();
const userRouter = express.Router();

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

tourRouter.route("/").get(getAllTours).post(createTour);
tourRouter.route("/:id").get(getTour).patch(updateTour).delete(deleteTour);

userRouter.route("/").get(getAllUsers).post(createUser);

userRouter.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

// 4) PORTS
const port = 3000;

app.listen(port, () => {
  console.log(`App listenin at port ${port}`);
});
