const { Candidate, validateCandidate } = require("../models/candidate.model");
const { ERROR_RESPONSE, SUCCESS_RESPONSE } = require("../utils/APIResponse");
const { User } = require("../models/user.model");

//get all votes on a candidates
exports.getVotesByCandidateId = async (req, res) => {
    const candidate = await Candidate.findById(req.params.id);
    if (!candidate) return res.status(404).send(ERROR_RESPONSE(null, "Candidate not found", 404));
    return res.status(200).send(SUCCESS_RESPONSE(candidate.votes, "Votes retrieved successfully", 200));
}
exports.vote = async (req, res) => {

    const candidate = await Candidate.findOne({ _id: req.params.id });
    if (!candidate) return res.status(404).json({ success: false, message: "candidate does not exist" });
    const UserToVote = await User.findOne({ userId: req.body.user });
    if (!UserToVote) return res.status(404).json({ success: false, message: "User does not exist" });
    const UserToVoteSecondTime = await Candidate.findOne({ user: req.body.user })
    // const UserToVoteSecondTime = await Candidate.findOne({
    //     $and: [
    //         { user: req.body.user },
    //         { _id: req.params.id }
    //     ]

    // })
    if (UserToVoteSecondTime) return res.status(404).json({ success: false, message: "You are allowed to vote only one candidate" });

    candidate.user = req.body.user;
    candidate.votes += 1;
    await candidate.save();
    return res.status(200).json({ success: true, data: candidate, message: 'Successfully Voted' });
}

//register candidate
exports.registerCandidate = async (req, res) => {
    console.log("body ", req.body);


    const { error } = validateCandidate(req.body);
    if (error) return res.status(400).send(ERROR_RESPONSE(null, error.details[0].message, 400));
    //find candidate by national Id 
    let sameCandidate = await Candidate.findOne({
        $or: [
            { nationalId: req.body.nationalId }
        ]

    })
    if (sameCandidate) {
        return res.status(404).send(ERROR_RESPONSE(null, "Candidate already exists", 404));
    }
    const candidate = new Candidate({
        user: undefined,
        fname: req.body.fname,
        lname: req.body.lname,
        nationalId: req.body.nationalId,
        missionStatement: req.body.missionStatement,
        profilePicture: req.body.profilePicture,
        gender: req.body.gender,
        votes: 0,
    });
    await candidate.save();
    return res.status(200).send(SUCCESS_RESPONSE(candidate, "Candidate registered successfully", 200));
}
//get all candidates
exports.getAllCandidates = async (req, res) => {
    const candidates = await Candidate.find();
    if (!candidates) return res.status(404).send(ERROR_RESPONSE(null, "Candidates not found", 404));


    return res.status(200).send(SUCCESS_RESPONSE(candidates, "Candidates retrieved successfully", 200));
}
