async function postNewEmail(values) {
  let requestOptions = setRequestOptions(values);
  try {
    let response = await fetch(
      'http://localhost:9000/templates',
      requestOptions
    );

    let body = await response.json();

    if (!response.ok) {
      return { ok: false, body };
    }
    return { ok: true, body };
  } catch (error) {
    return {
      ok: false,
      body: { message: 'An email with that name already exists' },
    };
  }
}

function setRequestOptions(values) {
  return {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: values.name,
      subject: values.subject,
      textbody: values.body,
    }),
  };
}

exports.postNewEmail = postNewEmail;
