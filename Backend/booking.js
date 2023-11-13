const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  flightImg: { type: String, required: true },
  flightName: { type: String, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  ticketAmount: { type: Number, required: true },
  Firstname: { type: String, required: true },
  Lastname: { type: String, required: true },
  email: { type: String, required: true },
  Mobilenumber: { type: Number, required: true },
  PassportNo: { type: String, required: true },
});
BookingSchema.index({ from: 1, to: 1 }, { unique: true });
module.exports = mongoose.model("booking", BookingSchema);
