// const Joi = require("joi");
const cors = require("cors");
const express = require("express");
const app = express();

const webhookRouter = require("./routes/webhook");
const recipientsRouter = require("./routes/recipients");
const emailsRouter = require("./routes/emails");
const emailRouter = require("./routes/email");
const templatesRouter = require("./routes/templates");
const templateRouter = require("./routes/template");

app.use(cors());
app.use(express.json());

app.use("/webhook", webhookRouter);
app.use("/recipients", recipientsRouter);
app.use("/emails", emailsRouter);
app.use("/email", emailRouter);
app.use("/templates", templatesRouter);
app.use("/template", templateRouter);

app.listen(9000);
