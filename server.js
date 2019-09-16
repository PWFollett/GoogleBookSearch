const express = require("express");
const path = require("path");
const mongoose = require("mongoose"); 

const PORT = process.env.PORT || 3000;
const app = express();


// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Parse request body as JSON
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));

// Mongo DB Connection 
var DB_Connect = process.env.MONGODB_URI || "mongodb://localhost/googlebookssearch"; 

mongoose.connect(DB_Connect, { useNewUrlParser: true }, function (err) {
    if (err) {
        console.log(err); 
    }
    else {
        console.log("connected to the db"); 
    }
});

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, function() {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});