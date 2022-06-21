// import React from 'react';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import VersionsTable from '../tables/VersionsTable';

function Email() {
  const { id } = useParams();
  const location = useLocation();
  const { email } = location.state;
  const [versions, setVersions] = useState([]);

  function appendVersion(version) {
    setVersions(versions => [...versions, version]);
  }

  useEffect(() => {
    async function fetchData() {
      try {
        let responce = await fetch(`http://localhost:9000/templates/${id}`);
        let body = await responce.json();
        setVersions(body);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  });

  return (
    <VersionsTable
      email={email}
      versions={versions}
      appendVersion={appendVersion}
    ></VersionsTable>
  );
}

export default Email;
