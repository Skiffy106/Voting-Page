// countVotes.js
const fs = require("fs");

// Read the CSV file and count votes
const votesData = fs.readFileSync("votes.csv", "utf-8");
const votesArray = votesData.trim().split("\n");
const voteCount = {};

votesArray.forEach((vote) => {
  const [category, selectedCandidate] = vote.split(",");
  const candidateKey = `${category}_${selectedCandidate}`;

  if (!voteCount[candidateKey]) {
    voteCount[candidateKey] = 1;
  } else {
    voteCount[candidateKey]++;
  }
});

// Find the winner for each category
const winners = {};

for (const key in voteCount) {
  const [category, selectedCandidate] = key.split("_");

  if (!winners[category] || voteCount[key] > winners[category].count) {
    winners[category] = {
      candidate: selectedCandidate,
      count: voteCount[key],
    };
  }
}

// Display the winners
console.log("Winners:");
for (const category in winners) {
  console.log(
    `${category}: ${winners[category].candidate} - ${winners[category].count} votes`
  );
}
