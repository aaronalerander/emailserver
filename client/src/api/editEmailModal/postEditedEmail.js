async function postEditedEmail(values, email) {
  let requestOptions = setRequestOptions(values);

  try {
    let response = await fetch(
      `http://localhost:9000/template/${email.id}`,
      requestOptions
    );

    let body = await response.json();

    if (!response.ok) {
      return { ok: false, body };
    }
    return { ok: true, body };
  } catch (error) {
    return { ok: false, body: { message: 'There was an error' } };
  }
}

function setRequestOptions(values) {
  return {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      subject: values.subject,
      textbody: values.textbody,
    }),
  };
}

exports.postEditedEmail = postEditedEmail;
