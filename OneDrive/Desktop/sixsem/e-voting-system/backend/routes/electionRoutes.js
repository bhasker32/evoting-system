const express = require("express");

const router = express.Router();

const electionController = require("../controllers/electionController");

router.get("/", electionController.getElections);

router.post("/create-election", electionController.createElection);

router.post("/add-candidate", electionController.addCandidate);

router.post("/start-election", electionController.startElection);

router.post("/vote", electionController.vote);

module.exports = router;