async function fetchCurrentVersionInfo(templateId, reset) {
  try {
    let responce = await fetch(`http://localhost:9000/template/${templateId}`);
    let body = await responce.json();

    reset({
      subject: body.Subject,
      textbody: body.HtmlBody,
    });
  } catch (error) {
    console.log(error);
  }
}

exports.fetchCurrentVersionInfo = fetchCurrentVersionInfo;
