async function fetchEmails(setEmails) {
  try {
    let responce = await fetch('http://localhost:9000/emails');
    let body = await responce.json();
    setEmails(body);
  } catch (error) {
    console.log(error);
  }
}

//module.exports = fetchEmails;
exports.fetchEmails = fetchEmails;
