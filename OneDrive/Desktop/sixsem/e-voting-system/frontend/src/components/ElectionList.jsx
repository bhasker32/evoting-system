import { useEffect, useState } from "react";
import { getElections, voteCandidate } from "../services/api";

export default function ElectionList() {

  const [elections, setElections] = useState([]);

  useEffect(() => {
    loadElections();
  }, []);

  const loadElections = async () => {

    const data = await getElections();
    setElections(data);

  };

  const vote = async (electionId, candidateId) => {

    try {

      const res = await voteCandidate(electionId, candidateId);

      alert("Vote submitted!\nTransaction: " + res.txHash);

      loadElections();

    } catch (err) {

      alert("Voting failed");

    }

  };

  return (

    <div>

      <h2>Active Elections</h2>

      {elections.map((election) => (

        <div key={election.id} style={{border:"1px solid gray",padding:"15px",margin:"10px"}}>

          <h3>{election.title}</h3>

          {election.candidates.map((c) => (

            <div key={c.id} style={{marginBottom:"8px"}}>

              {c.name} — Votes: {c.votes}

              <button
                style={{marginLeft:"10px"}}
                onClick={() => vote(election.id, c.id)}
              >
                Vote
              </button>

            </div>

          ))}

        </div>

      ))}

    </div>

  );

}