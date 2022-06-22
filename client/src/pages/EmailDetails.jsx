import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import VersionsTable from '../components/tables/VersionsTable/VersionsTable';
import { fetchEmailDetails } from '../api/emailDetails/fetchEmailDetails';

function EmailDetails() {
  const { id } = useParams();
  const location = useLocation();
  const { email } = location.state;
  const [versions, setVersions] = useState([]);

  function appendVersion(version) {
    setVersions(versions => [...versions, version]);
  }

  useEffect(() => {
    fetchEmailDetails(setVersions, id);
  });

  return (
    <VersionsTable
      email={email}
      versions={versions}
      appendVersion={appendVersion}
    ></VersionsTable>
  );
}

export default EmailDetails;
