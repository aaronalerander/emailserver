// import React from 'react';
import React, { useState, useEffect } from 'react';
import { assignRef, Flex, Text } from '@chakra-ui/react';
import Header from './Header';
import EmailsTable from './EmailsTable';

function Emails() {
  const [isLoading, setIsLoading] = useState(true);
  const [emails, setEmails] = useState([]);

  function appendEmail(email) {
    setEmails(emails => [...emails, email]); // i have to pass this fucker down as the call back
  }

  useEffect(() => {
    async function fetchData() {
      // You can await here
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

  // useEffect(() => {
  //   console.log('After setTC1LIST', emails);
  //   // What you want to do
  // }, [emails]); //notice this declaration of tc1list
  // // every state in this array will triger the call of the effect on change

  // Or [] if effect doesn't need props or state
  // i should have the state here / data

  //my state should have is loading and emails.

  /**since i have the state here will need a function that update state here
   *
   *
   *
   * and i will need to pass it down to emails taple
   * I will also need to pass down a list of emails to emailsTable.
   */

  return <EmailsTable emails={emails} appendEmail={appendEmail}></EmailsTable>;
}

export default Emails;

/**
 * this is for the other page
 *
 * that page will be extreamly simlar to this page in regards to logic
 *
 * it will have to fetch the versions.
 * the display versions component. will have the post function in side
 *
 * the edit template fuction can have the logic in side.
 *
 *
 */
