// import React from 'react';
import React, { useState, useEffect } from 'react';
import { assignRef, Flex, Text } from '@chakra-ui/react';
import Header from './Header';
import EmailsTable from './EmailsTable';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import VersionsTable from './VersionsTable';

function Email(props) {
  const [versions, setVersions] = useState([]);
  const location = useLocation();
  const { email } = location.state;
  const { id } = useParams();

  function appendVersion(version) {
    setVersions(versions => [...versions, version]); // i have to pass this fucker down as the call back
  }

  useEffect(() => {
    async function fetchData() {
      // You can await here
      try {
        let responce = await fetch(`http://localhost:9000/templates/${id}`);
        let body = await responce.json();
        setVersions(body);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  // useEffect(() => {
  //   console.log('After setTC1LIST', versions);
  //   // What you want to do
  // }, [versions]); //notice this declaration of tc1list
  // // every state in this array will triger the call of the effect on change

  return (
    <VersionsTable
      email={email}
      versions={versions}
      appendVersion={appendVersion}
    ></VersionsTable>
  );
}

export default Email;
