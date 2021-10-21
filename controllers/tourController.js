const fs = require("fs");

const toursData = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkID = (req, res, next, val) => {
  console.log(`Tour id is ${val}`);
  next();
};

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    result: toursData.length,
    data: {
      tours: toursData,
    },
  });
};

exports.getTour = (req, res) => {
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

exports.updateTour = (req, res) => {
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

exports.deleteTour = (req, res) => {
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

exports.createTour = (req, res) => {
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
