const candidateController = require("../controllers/candidate.controller");
const { verifiedToken } = require("../utils/token");
const BASE_URL = process.env.BASE_URL;
module.exports = (app) => {
    var fs = require('fs');
    var multer = require('multer');
    var upload = multer({ dest: 'uploads/' }); //setting the default folder for multer

    app.post(`${BASE_URL}/candidate/register`, verifiedToken, candidateController.registerCandidate);
    app.post(`${BASE_URL}/candidate/vote/:id`, verifiedToken, candidateController.vote);
    app.get(`${BASE_URL}/candidate/:id`, verifiedToken, candidateController.getVotesByCandidateId);
    app.get(`${BASE_URL}/candidates`, verifiedToken, candidateController.getAllCandidates);

}