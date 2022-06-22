// import {showErrorToast} from '../../utils/showErrorToast'
// import { showSuccessToast } from '../../utils/showSuccessToast';

async function postNewEmail(values, reset, toast, appendEmail) {
  let requestOptions = setRequestOptions(values);

  reset();

  try {
    let response = await fetch(
      'http://localhost:9000/templates',
      requestOptions
    );

    let body = await response.json();

    if (!response.ok) {
      showErrorToast(body, toast);
      return;
    }

    showSuccessToast(toast);
    appendEmail(body.email);
  } catch (error) {
    showErrorToast(
      { message: 'Looks like you already have a template with that name' },
      toast
    );
    console.log(error);
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

exports.postNewEmail = postNewEmail;
