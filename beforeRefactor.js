router.post("/", async (req, res) => {
  //not sure if i should make this validation into a Joi validation. Only thing is it is one feild so it feel be redundant/complecated for not reason

  //********Get email ID ***********************/
  if (!req.body.id) {
    res.status(400).send("You  did not include the email id ");
    return;
  }
  if (isNaN(req.body.id)) {
    res.status(400).send("Id must be an interger");
    return;
  }

  let emailId = parseInt(req.body.id);
  //********Get email ID ************************/

  //********Get email  ************************/
  let email = Data.Emails.find((email) => email.id === emailId);

  if (email === undefined) {
    res.status(404).send("The email with the given Id was not found");
    return;
  }
  //********Get email ************************/

  let templateId = email.currentTemplateId;
  let RecipientEmails = Data.Recipients.map(
    (recipient) => recipient.email
  ).join(", ");

  //********send email ************************/

  try {
    let result = await Postmark.postmarkClient.sendEmailWithTemplate({
      TemplateId: templateId,
      From: FROM_EMAIL,
      To: RecipientEmails,
      TemplateModel: {},
      TrackOpens: true,
      TrackLinks: "HtmlAndText",
      MessageStream: "outbound",
      Metadata: {
        templateId: templateId,
        emailId: emailId,
      },
    });

    console.log(result);
    res.status(200).send("email was sucessfully sent");
  } catch (error) {
    useEffect(() => {
      async function fetchData() {
        try {
          let responce = await fetch("http://localhost:9000/emails");
          let body = await responce.json();
          setEmails(body);
        } catch (error) {
          console.log(error);
        }
      }
      fetchData();
    }, []);
    console.log(error);
    res.status(500).send(error);
    return;
  }

  //********send email ************************/
});
