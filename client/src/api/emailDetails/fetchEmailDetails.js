async function fetchEmailDetails(setVersions, id) {
  try {
    let responce = await fetch(`http://localhost:9000/templates/${id}`);
    let body = await responce.json();
    setVersions(body);
  } catch (error) {
    console.log(error);
  }
}

exports.fetchEmailDetails = fetchEmailDetails;
