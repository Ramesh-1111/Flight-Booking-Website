// server.js
const express = require("express");
const cors = require("cors");
const app = express();
const routes = require("./routes");
const PDFDocument = require("pdfkit");
const pdf = require("html-pdf");
const fs = require("fs");
const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://rameshcs21:RaNa256225@details.0el81or.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Enable cross-origin resource sharing
app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200"); // Replace with your frontend domain
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Parse JSON requests
app.use(express.json());

// Routes
app.use("/api", routes);

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

app.get("/download-ticket", (req, res) => {
  const flight = req.query.flight;
  const date = req.query.date;
  const name = req.query.name;
  const from = req.query.from;
  const to = req.query.to;
  const name1 = req.query.name1;
  const from1 = req.query.from1;
  const to1 = req.query.to1;

  // Read the HTML template file
  const template = fs.readFileSync("./ticket.html", "utf8");

  // Replace placeholders in the template with actual data
  const htmlContent = template
    .replace("{{flight}}", flight)
    .replace("{{date}}", date)
    .replace("{{name}}", name)
    .replace("{{from}}", from)
    .replace("{{to}}", to)
    .replace("{{name1}}", name1)
    .replace("{{from1}}", from1)
    .replace("{{to1}}", to1);

  // Configuration for pdf creation
  const pdfOptions = {
    format: "Custom",
    width: "200mm",
    height: "100mm",
    orientation: "landscape",
  };

  // Generate PDF from HTML content with CSS styles
  pdf.create(htmlContent, pdfOptions).toStream((err, stream) => {
    if (err) {
      res.status(500).send("Error generating PDF");
      return;
    }

    // Set response headers
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=ticket.pdf");

    // Pipe the PDF stream to the response
    stream.pipe(res);
  });
});
