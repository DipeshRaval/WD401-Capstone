const express = require("express");
const router = express.Router();
const { Election, Voter, Quetion, Option } = require("../models");
// const getResponse = require("../middleware/chatGPT");
const authValidate = require("../middleware/authMiddleware");
const getResponse = require("../middleware/openai");

// get all election for the current user
router.get("/", authValidate, async (req, res) => {
    console.log(req.user);
    const ele = await Election.getElection(req.user.id);
    return res.status(200).json({ election: ele });
}
);

// create a new election
router.post("/", authValidate, async (req, res) => {
    console.log(req.body);
    if (req.user.role == "admin") {
        if (req.body.title.trim().length < 5) {
            return res.status(200).json({ error: "Election name length must be greater than 5" });
        }
        if (req.body.url.length === 0) {
            return res.status(200).json({ error: "URL cannot be empty" });
        }
        try {
            let newEle = await Election.addElection({
                title: req.body.title,
                url: req.body.url,
                adminId: req.user.id,
            });
            return res.status(200).json({ election: { id: newEle.id, title: newEle.title, url: newEle.url } });
        } catch (error) {
            console.log(error);
            if (error.name == "SequelizeUniqueConstraintError") {
                error.errors.forEach((e) => {
                    if (e.message == "url must be unique") {
                        return res.status(200).json({ error: "URL already used, provide another one" });
                    }
                });
            } else {
                return res.status(422).json({ error: error.message });
            }
        }
    } else {
        return res.status(200).json({ error: "Unauthorized, only admins can perform this action" });
    }
});

// get specific election data
router.get("/:id", authValidate, async (req, res) => {
    if (req.user.role == "admin") {
        console.log(req.user);
        console.log(req.params.id);
        try {
            const election = await Election.findByPk(req.params.id);
            const que = await Quetion.getQuetions(req.params.id);
            const voters = await Voter.getVoters(req.params.id);
            res.status(200).json({
                election,
                quetion: que,
                totalVoter: voters.length,
            });
        } catch (err) {
            console.log(err);
            return res.status(422).json({ error: err.message });
        }
    } else {
        return res.status(200).json({ error: "Unauthorized, only admins can access this resource" });
    }
}
);

// add a new quetion to the election
router.get("/:id/addQuestion", authValidate, async (req, res) => {
    if (req.user.role == "admin") {
        console.log(req.params.id);
        try {
            const election = await Election.findByPk(req.params.id);

            if (election.launch) {
                return res.status(400).json({ error: "Election is live so you can't change ballot" });
            }

            const questions = await Quetion.getQuestions(req.params.id);
            const responseData = { election, questions };

            // If not HTML, send JSON response
            res.res.status(200).json(responseData);
        } catch (err) {
            console.log(err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    } else {
        return res.status(403).json({ error: "Unauthorized" });
    }
}
);

router.post(
    "/:id/addQuestion",
    authValidate, async (req, res) => {
        console.log(req.body);
        console.log(req.params.id);
        if (req.user.role == "admin") {
            if (req.body.title.trim().length <= 5) {
                return res.status(200).json({ error: "Title length must be greater than 5" });
            }
            if (req.body.desc.length === 0) {
                return res.status(200).json({ error: "Description cannot be empty" });
            }
            if (req.body.desc.length <= 15) {
                return res.status(200).json({ error: "Description length must be greater than 15" });
            }
            try {
                const question = await Quetion.addQuetion({
                    title: req.body.title,
                    description: req.body.desc,
                    electionID: req.params.id,
                });
                return res.status(200).json({ id: question.id, title: question.title, description: question.description });
            } catch (error) {
                console.log(error);
                return res.status(422).json({ error: "Unprocessable Entity" });
            }
        } else {
            return res.status(403).json({ error: "Unauthorized" });
        }
    }
);


router.get("/question/:qId/addOptions", authValidate, async (req, res) => {
    // router.get("/:eId/question/:qId/addOptions", authValidate, async (req, res) => {
    if (req.user.role == "admin") {
        try {
            // const election = await Election.findByPk(req.params.eId);
            const question = await Quetion.findByPk(req.params.qId);
            const options = await Option.getOptions(req.params.qId);

            const responseData = {
                question,
                options
            };

            return res.status(200).json(responseData);
        } catch (err) {
            console.log(err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    } else {
        return res.status(403).json({ error: "Unauthorized" });
    }
}
);

// add a a option to a quetion
router.post("/question/:qId/addOptions", authValidate, async (req, res) => {
    if (req.user.role == "admin") {
        if (req.body.name.length === 0) {
            return res.status(400).json({ error: "Option value cannot be empty" });
        }
        try {
            const option = await Option.addOption({
                optionName: req.body.name,
                queid: req.body.qid,
            });
            return res.status(200).json({ id: option.id, optionName: option.optionName, queid: option.queid });
        } catch (err) {
            console.log(err);
            return res.status(422).json({ error: "Unprocessable Entity" });
        }
    } else {
        return res.status(403).json({ error: "Unauthorized" });
    }
}
);

// delete a election
router.delete(
    "/:id",
    authValidate, async (req, res) => {
        if (req.user.role == "admin") {
            const election = await Election.findByPk(req.params.id);
            if (!election.launch) {
                console.log("We are deleting an election with ID: ", req.params.id);
                try {
                    debugger
                    const affectedRow = await Election.destroy({ where: { id: req.params.id, adminId: req.user.id } })
                    // const affectedRow = await Election.remove(req.params.id, req.user.id);
                    // console.log(affectedRow);
                    return res.status(200).json({ success: affectedRow ? true : false });
                } catch (error) {
                    console.log(error);
                    return res.status(422).json({ error: "Unprocessable Entity" });
                }
            } else {
                return res.status(400).json({ error: "Election is live so you can't delete it" });
            }
        } else {
            return res.status(403).json({ error: "Unauthorized" });
        }
    }
);

// modify the election
router.post(
    "/modify/:id",
    authValidate, async (req, res) => {
        if (req.user.role == "admin") {
            if (req.body.title.trim().length < 5) {
                return res.status(400).json({ error: "Election name length must be greater than 5" });
            }
            if (req.body.url.length === 0) {
                return res.status(400).json({ error: "URL cannot be empty" });
            }
            try {
                await Election.updateElection({
                    id: req.params.id,
                    title: req.body.title,
                    url: req.body.url,
                    adminId: req.user.id,
                });
                return res.status(200).json({ success: true, message: "Election modified successfully" });
            } catch (error) {
                if (error.name == "SequelizeUniqueConstraintError") {
                    const errorMessage = error.errors.find(e => e.message == "url must be unique")
                        ? "URL has been used before, please provide another one."
                        : "An error occurred while processing your request.";
                    return res.status(400).json({ error: errorMessage });
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
    "/delque/:id",
    authValidate, async (req, res) => {
        if (req.user.role == "admin") {
            console.log("We are deleting a question with ID:", req.params.id);
            try {
                const affectedRow = await Quetion.destroy({ where: { id: req.params.id } })
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

// delete a option

router.delete(
    "/option/:id",
    authValidate,
    async (req, res) => {
        if (req.user.role == "admin") {
            console.log("We are deleting an option with ID:", req.params.id);
            try {
                const affectedRow = await Option.destroy({ where: { id: req.params.id } })
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

router.post(
    "/aiQuetion/:id",
    authValidate, async (req, res) => {
        if (req.user.role == "admin") {
            const a = await getResponse(req.body.text)
            console.log("RESPONSE :  " + a);
            return a
        } else {
            return res.status(403).json({ error: "Unauthorized" });
        }
    }
);
module.exports = router;