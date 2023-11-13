const mongoose = require("mongoose");

const InterSchema = new mongoose.Schema({
  flightImg: { type: String, required: true },
  flightName: { type: String, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  ticketAmount: { type: Number, required: true },
  Date: { type: Date, required: true },
});

module.exports = mongoose.model("InternationalFlights", InterSchema);
