const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  flightImg: { type: String, required: true },
  flightName: { type: String, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  ticketAmount: { type: Number, required: true },
});

module.exports = mongoose.model("DomesticFlight", userSchema);
