const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const PORT = 3000;

// Set up middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

// Routes
app.get("/", (req, res) => {
  // Render your updated voting page here (e.g., index.ejs)
  res.render("index");
});

app.post("/submit-vote", (req, res) => {
  //   console.log(req);
  // Extract data from the form submission
  const presidentData = {
    selectedCandidate: req.body.presidentCandidate,
    category: "president",
  };

  const vicePresidentData = {
    selectedCandidate: req.body.vicePresidentCandidate,
    category: "vice-president",
  };

  const treasurerData = {
    selectedCandidate: req.body.treasurerCandidate,
    category: "treasurer",
  };

  const secretaryData = {
    selectedCandidate: req.body.secretaryCandidate,
    category: "secretary",
  };

  const promoterData = {
    selectedCandidate: req.body.promoterCandidate,
    category: "promoter",
  };

  const projectManagerData = {
    selectedCandidate: req.body.projectManagerCandidate,
    category: "project-manager",
  };

  //   console.log(presidentData);
  //   console.log(vicePresidentData);
  // Create CSV format strings for each category
  const presidentCsvData = `${presidentData.category},${presidentData.selectedCandidate}\n`;
  const vicePresidentCsvData = `${vicePresidentData.category},${vicePresidentData.selectedCandidate}\n`;
  const treasurerCsvData = `${treasurerData.category},${treasurerData.selectedCandidate}\n`;
  const secretaryCsvData = `${secretaryData.category},${secretaryData.selectedCandidate}\n`;
  const promoterCsvData = `${promoterData.category},${promoterData.selectedCandidate}\n`;
  const projectManagerCsvData = `${projectManagerData.category},${projectManagerData.selectedCandidate}\n`;

  const data =
    presidentCsvData +
    vicePresidentCsvData +
    treasurerCsvData +
    secretaryCsvData +
    promoterCsvData +
    projectManagerCsvData;

  // Append the data to the CSV file
  fs.appendFile("votes.csv", data, (err) => {
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
