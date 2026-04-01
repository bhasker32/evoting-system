require("dotenv").config();
const express = require("express");
const cors = require("cors");

const electionRoutes = require("./routes/electionRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/elections", electionRoutes);

app.get("/", (req, res) => {
  res.send("Blockchain Voting API Running");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});