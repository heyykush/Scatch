const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner.model");

router.get("/", function (req, res) {
    res.send("hey it's working");
});

if (process.env.NODE_ENV === "development") {

    router.post("/create", async function (req, res) {
        try {
            const ownerExists = await ownerModel.exists({});

            if (ownerExists) {
                return res
                    .status(503)
                    .send("You don't have permission to create a new owner.");
            }

            const { fullname, email, password } = req.body;

            const createdOwner = await ownerModel.create({
                fullname,
                email,
                password
            });

            res.status(201).send(createdOwner);

        } catch (err) {
            console.error(err);
            res.status(500).send("Server Error");
        }
    });

}

module.exports = router;
