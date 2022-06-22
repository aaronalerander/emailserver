async function putEmail(templateId, email) {
  let requestOptions = setRequestOptions(templateId);

  try {
    let response = await fetch(
      `http://localhost:9000/email/${email.id}`,
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

function setRequestOptions(templateId) {
  return {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      templateId: templateId,
    }),
  };
}

exports.putEmail = putEmail;
