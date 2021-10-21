const express = require("express");
const app = express();

const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

// 1) MIDDLEWARES

app.use(express.static(`${__dirname}/public`));

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

// 3) ROUTERS
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;
