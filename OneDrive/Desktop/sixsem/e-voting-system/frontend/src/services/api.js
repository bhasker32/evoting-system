import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api"
});

export const getElections = async () => {
  const res = await API.get("/elections");
  return res.data;
};

export const voteCandidate = async (electionId, candidateId) => {
  const res = await API.post("/elections/vote", {
    electionId,
    candidateId
  });
  return res.data;
};