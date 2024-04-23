const express = require("express");
const router = express.Router();
const { Election, Voter } = require("../models");
const authValidate = require("../middleware/authMiddleware");
const bcrypt = require("bcryptjs");
var saltRound = bcrypt.genSaltSync(10);

router.get(
    "/:eid",
    authValidate,
    async (req, res) => {
        if (req.user.role == "admin") {
            try {
                const voters = await Voter.getVoters(req.params.eid);
                return res.status(200).json([...voters]);
            } catch (error) {
                console.log(error);
                return res.status(422).json({ error: "Unprocessable Entity" });
            }
        } else {
            return res.status(403).json({ error: "Unauthorized" });
        }
    }
);

router.post(
    "/:eid/addvoter",
    authValidate,
    async (req, res) => {
        if (req.user.role == "admin") {
            if (req.body.voterId.trim().length < 3) {
                return res.status(200).json({ error: "Voter ID must be greater than 2 characters" });
            }
            if (req.body.password.length === 0) {
                return res.status(200).json({ error: "Password cannot be empty" });
            }
            if (req.body.password.length <= 5) {
                return res.status(200).json({ error: "Password must be greater than 5 characters" });
            }

            const pwd = bcrypt.hashSync(req.body.password, saltRound);

            try {
                const voter = await Voter.addVoter({
                    voterId: req.body.voterId,
                    password: pwd,
                    electionId: req.params.eid,
                });

                return res.status(200).json({ voterId: voter.voterId, id: voter.id });
            } catch (error) {
                if (error.name == "SequelizeUniqueConstraintError") {
                    const errorMessage = error.errors.find(e => e.message == "voterId must be unique")
                        ? "Voter with this VoterId already exists"
                        : "An error occurred while processing your request.";
                    return res.status(200).json({ error: errorMessage });
                } else {
                    console.log(error);
                    return res.status(422).json({ error: "Unprocessable Entity" });
                }
            }
        } else {
            return res.status(403).json({ error: "Unauthorized" });
        }
    }
);


router.delete(
    "/:id",
    authValidate,
    async (req, res) => {
        if (req.user.role == "admin") {
            console.log("We are deleting a Voter with ID:", req.params.id);
            try {
                const affectedRow = await Voter.destroy({ where: { id: req.params.id } })
                return res.status(200).json({ success: affectedRow ? true : false });
            } catch (error) {
                console.log(error);
                return res.status(422).json({ error: "Unprocessable Entity" });
            }
        } else {
            return res.status(403).json({ error: "Unauthorized" });
        }
    }
);


module.exports = router;
