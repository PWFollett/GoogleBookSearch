const express = require("express");
const mongoose = require ("mongoose");
const routes= require ("./routes")

var PORT = process.env.PORT || 3001;
var app = express();

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("build/client"));
}

// Define API routes here
app.use(routes)

//Connect to mongoose
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/googlebooks", {useNewUrlParser: true});


app.listen(PORT, () => {
  console.log(`Global ==> API server now on port ${PORT}!`);
});