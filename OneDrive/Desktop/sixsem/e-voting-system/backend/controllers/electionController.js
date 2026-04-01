const contract = require("../config/blockchain");

exports.createElection = async (req, res) => {
  try {

    const { title } = req.body;

    const tx = await contract.createElection(title);

    await tx.wait();

    res.json({
      message: "Election created successfully",
      txHash: tx.hash
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
};
exports.addCandidate = async (req, res) => {

  try {

    const { electionId, candidates } = req.body;

    const txHashes = [];

    for (const name of candidates) {

      const tx = await contract.addCandidate(electionId, name);

      const receipt = await tx.wait();

      txHashes.push(receipt.hash);

    }

    res.json({
      message: "Candidates added successfully",
      transactions: txHashes
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: error.message
    });

  }
};


exports.startElection = async (req, res) => {

  try {

    const { electionId } = req.body;

    const tx = await contract.startElection(electionId);

    const receipt = await tx.wait();

    res.json({
      message: "Election started successfully",
      txHash: receipt.hash
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: error.message
    });

  }

};

exports.vote = async (req, res) => {

  try {

    const { electionId, candidateId } = req.body;

    const tx = await contract.vote(electionId, candidateId);

    const receipt = await tx.wait();

    res.json({
      message: "Vote cast successfully",
      txHash: receipt.hash
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: error.message
    });

  }

};

exports.getElections = async (req, res) => {

  try {

    const electionCount = await contract.electionCount();

    const elections = [];

    for (let i = 1; i <= electionCount; i++) {

      const election = await contract.getElection(i);

      const candidateCount = election[3];

      const candidates = [];

      for (let j = 1; j <= candidateCount; j++) {

        const candidate = await contract.getCandidate(i, j);

        candidates.push({
          id: candidate[0].toString(),
          name: candidate[1],
          votes: candidate[2].toString()
        });

      }

      elections.push({
        id: election[0].toString(),
        title: election[1],
        active: election[2],
        candidates
      });

    }

    res.json(elections);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: error.message
    });

  }

};