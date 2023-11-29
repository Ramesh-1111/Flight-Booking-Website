const express = require("express");
const router = express.Router();
const UserController = require("./userController");
const internationaldetails = require("./InterModel");
const Authentication = require("./AuthModel");
const twilio = require("twilio");
const accountSid = "AC5353c44720e51dfacdcf2c56639f76bf";
const authToken = "12f8e65f33ef5fa5a80e4262ab75fe23";
const client = twilio(accountSid, authToken);
router.post("/users", UserController.createUser);
router.get("/users/getAll", UserController.getUsers);
router.get("/users/:id", UserController.getUserById);
router.put("/users/:id", UserController.updateUser);
router.delete("/users/:id", UserController.deleteUser);

router.get("/internationaldetails/getAll", (req, res) => {
  internationaldetails
    .find({})
    .then((products) => {
      res.status(200).json(products);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    });
});

const Booking = require("./booking");

// Add booking
router.post("/bookings", async (req, res) => {
  const {
    flightImg,
    flightName,
    from,
    to,
    departureTime,
    arrivalTime,
    ticketAmount,
    Firstname,
    Lastname,
    email,
    Mobilenumber,
    PassportNo,
  } = req.body;

  const newBooking = new Booking({
    flightImg,
    flightName,
    from,
    to,
    departureTime,
    arrivalTime,
    ticketAmount,
    Firstname,
    Lastname,
    email,
    Mobilenumber,
    PassportNo,
  });

  try {
    const savedBooking = await newBooking.save();
    res.status(200).json(savedBooking);
  } catch (err) {
    console.error("Error while saving the booking:", err);
    res.status(500).send("An error occurred while saving the booking.");
  }
});

// Get bookings
router.get("/bookings/all", async (req, res) => {
  try {
    const bookings = await Booking.find({});
    res.status(200).json(bookings);
  } catch (err) {
    console.error("Error while fetching bookings:", err);
    res.status(500).send("An error occurred while fetching bookings.");
  }
});

// Delete booking
router.delete("/bookings/:id", (req, res) => {
  const bookingId = req.params.id;

  Booking.findOneAndDelete({ _id: bookingId })
    .then((deletedBooking) => {
      if (deletedBooking) {
        res.status(200).json({ message: "Booking successfully removed." });
      } else {
        res.status(404).send("Booking not found.");
      }
    })
    .catch((err) => {
      console.error("Error while deleting booking:", err);
      res.status(500).send("An error occurred while deleting the booking.");
    });
});

// Route for sending OTP
router.post("/sendOTP", async (req, res) => {
  const { mobileNumber } = req.body;

  try {
    // Check if the user already exists in the database
    const user = await Authentication.findOne({ mobileNumber });
    if (!user) {
      // Create a new user if not found
      const newUser = new Authentication({ mobileNumber });
      await newUser.save();
    }

    // Generate OTP
    const otp = generateOTP();

    // Send OTP via SMS
    await sendOTPviaSMS(mobileNumber, otp);

    // Save the OTP in the user's document
    await Authentication.updateOne({ mobileNumber }, { otp });

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Function to generate OTP
function generateOTP() {
  // Generate a random 6-digit OTP
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Function to send OTP via SMS
async function sendOTPviaSMS(mobileNumber, otp) {
  try {
    await client.messages.create({
      body: `Your OTP is: ${otp}`,
      from: "+12055709123",
      to: mobileNumber,
    });
  } catch (error) {
    console.error("Error sending OTP via SMS:", error);
    throw error;
  }
}
router.post("/verifyOTP", async (req, res) => {
  const { mobileNumber, otp } = req.body;

  try {
    const user = await Authentication.findOne({ mobileNumber });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.otp === otp) {
      // OTP is correct
      // Perform additional actions as needed
      res.status(200).json({ message: "OTP verification successful" });
    } else {
      // OTP is incorrect
      res.status(401).json({ error: "Incorrect OTP" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
