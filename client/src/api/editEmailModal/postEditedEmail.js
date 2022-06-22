async function postEditedEmail(
  values,
  reset,
  email,
  toast,
  appendVersion,
  setCurrentTemplateId
) {
  let requestOptions = setRequestOptions(values);

  reset();

  try {
    let response = await fetch(
      `http://localhost:9000/template/${email.id}`,
      requestOptions
    );

    let body = await response.json();

    if (!response.ok) {
      showErrorToast(body, toast);
      return;
    }
    showSuccessToast(toast);
    appendVersion(body.template);
    setCurrentTemplateId(body.template.id);
  } catch (error) {
    console.log(error);
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

function showErrorToast(body, toast) {
  toast({
    title: 'Error!',
    description: body.message,
    status: 'error',
    duration: 5000,
    isClosable: true,
  });
}

function showSuccessToast(toast) {
  toast({
    title: 'Success!',
    description: "We've edited your template and added a version.",
    status: 'success',
    duration: 5000,
    isClosable: true,
  });
}

exports.postEditedEmail = postEditedEmail;
