async function putEmail(templateId, email, toast, setCurrentTemplateId) {
  let requestOptions = setRequestOptions(templateId);

  try {
    let response = await fetch(
      `http://localhost:9000/email/${email.id}`,
      requestOptions
    );

    let body = await response.json();

    if (!response.ok) {
      showErrorToast(body, toast);
      return;
    }

    setCurrentTemplateId(body.template.id);

    showSuccessToast(
      `Sucessfuly reverted to version ${body.template.version}`,
      toast
    );
    return;
  } catch (error) {}
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

function showErrorToast(body, toast) {
  toast({
    title: 'Error!',
    description: body.message,
    status: 'error',
    duration: 5000,
    isClosable: true,
  });
}

function showSuccessToast(message, toast) {
  toast({
    title: 'Success!',
    description: message,
    status: 'success',
    duration: 5000,
    isClosable: true,
  });
}

exports.putEmail = putEmail;
