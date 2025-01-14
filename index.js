const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
const cloudinary = require("./Services/cloudinary");
const { paypal, router: paypalRouter } = require("./Services/paypal");
const messageRoutes = require("./routes/message");
const reviewRoutes = require("./routes/review");
const flightRoutes = require("./routes/flights");
const roomTypeRoute = require("./routes/rooms");
const bookingRoute = require("./routes/booking");
const carRentalRoute = require("./routes/carRentals");
let hostRouter = require("./routes/hosts");
let apartmentRouter = require("./routes/apartment");
let amenitiesRouter = require("./routes/amenities");
var usersRouter = require("./routes/user");
let cloudinaryRouter = require("./Services/cloudinary").router;
app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
app.use("/host", hostRouter);
app.use("/apartments", apartmentRouter);
app.use("/amenities", amenitiesRouter);
app.use("/messages", messageRoutes);
app.use("/reviews", reviewRoutes);
app.use("/flights", flightRoutes);
app.use("/rooms", roomTypeRoute);
app.use("/bookings", bookingRoute);
app.use("/carRentals", carRentalRoute);
app.use("/user", usersRouter);
app.use("/cloudinary", cloudinaryRouter);
app.use("/paypal", paypalRouter);
app.use("/", (req, res) => {
  res.status(200).json("hello");
});
app.use("*", (req, res) => {
  res.status(404).json({ message: "This route does not exist" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  connect();
  console.log("Connected to backend ");
});

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("connected to booking db");
  } catch (error) {
    console.log(error.message);
  }
};
