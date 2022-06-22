import React from 'react';
import { Flex, Text, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const EmailsTableRow = ({ email }) => {
  return (
    <>
      <Flex key={email.id}>
        <Flex
          key={email.id}
          justifyContent="space-between"
          alignItems="center"
          minWidth={1000}
          mb={5}
        >
          <Text>{email.name}</Text>
          <Text color="blue">{email.opens}</Text>
          <Text color="red">{email.clicks}</Text>
          <Link to={`/email/${email.id}`} state={{ email: email }}>
            <Button colorScheme="blue" variant="solid" size="md" href="/test">
              View Details
            </Button>
          </Link>
        </Flex>
      </Flex>
    </>
  );
};

export default EmailsTableRow;
