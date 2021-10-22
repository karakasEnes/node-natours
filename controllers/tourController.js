const fs = require("fs");

const toursData = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkID = (req, res, next, val) => {
  console.log(`Tour id is: ${val}`);

  if (req.params.id * 1 > toursData.length) {
    return res.status(404).json({
      status: "fail",
      message: "There is no tour found!.",
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(500).json({
      status: "fail",
      message: "User name or price should entered.",
    });
  }
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
  res.status(200).json({
    middlewareProperty: req.isoDateString,
    status: "success",
    tour: toursData[req.params.id * 1],
  });
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: "success",
    tour: "Updated tour here",
  });
};

exports.deleteTour = (req, res) => {
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
