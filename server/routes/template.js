const express = require("express");
const router = express.Router();
const template = require("../usecases/template");

router.get("/:id", async (req, res) => {
  try {
    let responceBody = await template.get(req.params.id);
    return res.status(200).send(responceBody);
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.post("/:emailId", async (req, res) => {
  try {
    let responceBody = await template.post(req.params.emailId, req.body);
    return res.status(200).send(responceBody);
  } catch (error) {
    return res.status(400).send(error);
  }
});

module.exports = router;
