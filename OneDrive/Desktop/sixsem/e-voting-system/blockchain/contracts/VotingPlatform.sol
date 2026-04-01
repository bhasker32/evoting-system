// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract VotingPlatform {

    address public admin;

    constructor() {
        admin = msg.sender;
    }

    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    struct Election {
        uint id;
        string title;
        bool active;
        uint candidateCount;
    }

    uint public electionCount;

    mapping(uint => Election) public elections;

    mapping(uint => mapping(uint => Candidate)) public candidates;

    mapping(uint => mapping(address => bool)) public hasVoted;

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin allowed");
        _;
    }

    // -----------------------------
    // CREATE ELECTION
    // -----------------------------

    function createElection(string memory _title) public onlyAdmin {

        electionCount++;

        elections[electionCount] = Election(
            electionCount,
            _title,
            false,
            0
        );
    }

    // -----------------------------
    // ADD CANDIDATE
    // -----------------------------

    function addCandidate(uint _electionId, string memory _name) public onlyAdmin {

        Election storage e = elections[_electionId];

        require(e.id != 0, "Election not found");

        e.candidateCount++;

        candidates[_electionId][e.candidateCount] = Candidate(
            e.candidateCount,
            _name,
            0
        );
    }

    // -----------------------------
    // START ELECTION
    // -----------------------------

    function startElection(uint _electionId) public onlyAdmin {

        require(elections[_electionId].id != 0, "Election not found");

        elections[_electionId].active = true;
    }

    // -----------------------------
    // END ELECTION
    // -----------------------------

    function endElection(uint _electionId) public onlyAdmin {

        require(elections[_electionId].id != 0, "Election not found");

        elections[_electionId].active = false;
    }

    // -----------------------------
    // VOTE
    // -----------------------------

    function vote(uint _electionId, uint _candidateId) public {

        require(elections[_electionId].active, "Election not active");

        require(!hasVoted[_electionId][msg.sender], "Already voted");

        require(_candidateId > 0 && _candidateId <= elections[_electionId].candidateCount, "Invalid candidate");

        candidates[_electionId][_candidateId].voteCount++;

        hasVoted[_electionId][msg.sender] = true;
    }

    // -----------------------------
    // READ ELECTION
    // -----------------------------

    function getElection(uint electionId)
        public
        view
        returns (
            uint id,
            string memory title,
            bool active,
            uint candidateCount
        )
    {

        Election storage e = elections[electionId];

        return (
            e.id,
            e.title,
            e.active,
            e.candidateCount
        );
    }

    // -----------------------------
    // READ CANDIDATE
    // -----------------------------

    function getCandidate(uint electionId, uint candidateId)
        public
        view
        returns (
            uint id,
            string memory name,
            uint voteCount
        )
    {

        Candidate storage c = candidates[electionId][candidateId];

        return (
            c.id,
            c.name,
            c.voteCount
        );
    }

}