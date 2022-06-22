import React, { useState, useEffect } from 'react';
import EmailsTable from '../components/tables/EmailsTable./EmailsTable';

function Emails() {
  const [emails, setEmails] = useState([]);

  function appendEmail(email) {
    setEmails(emails => [...emails, email]);
  }

  useEffect(() => {
    async function fetchData() {
      try {
        let responce = await fetch('http://localhost:9000/emails');
        let body = await responce.json();
        setEmails(body);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return <EmailsTable emails={emails} appendEmail={appendEmail}></EmailsTable>;
}

export default Emails;

// useEffect(() => {
//   console.log('After setTC1LIST', emails);
//   // What you want to do
// }, [emails]); //notice this declaration of tc1list
// // every state in this array will triger the call of the effect on change
