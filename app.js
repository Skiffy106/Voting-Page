const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const PORT = 3000;

// Set up middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

// Read the candidates JSON file
const candidatesData = JSON.parse(fs.readFileSync("candidates.json", "utf-8"));

// Routes
app.get("/", (req, res) => {
  // Render your updated voting page here (e.g., index.ejs)
  res.render("index", { candidatesData });
});

app.post("/submit-vote", (req, res) => {
  let csvData = "";
  const categoryArray = req.body.category;

  for (let index = 0; index < categoryArray.length; index++) {
    let candidate = req.body[`${categoryArray[index]}Candidate`];
    csvData += `${categoryArray[index]},${candidate}\n`;
  }

  // Append the data to the CSV file
  fs.appendFile("votes.csv", csvData, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error submitting votes");
    } else {
      res.render("submitted");
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
