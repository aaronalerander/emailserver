// import React from 'react';
import React, { useState, useEffect } from 'react';
import { assignRef, Flex, Text } from '@chakra-ui/react';
import Header from './Header';
import EmailsTable from './EmailsTable';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function Email(props) {
  const location = useLocation();
  const { name } = location.state;
  const { id } = useParams();

  return (
    <div>
      {console.log(name)}
      <h1>{id}</h1>
    </div>
  );
}

export default Email;
