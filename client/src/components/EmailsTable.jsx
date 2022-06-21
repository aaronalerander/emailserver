import React from 'react';
import { ChakraProvider, Flex, Text, Button } from '@chakra-ui/react';

import { Link } from 'react-router-dom';
import CreateEmailModal from './CreateEmailModal';

const EmailsTable = props => {
  return (
    <>
      <ChakraProvider resetCSS>
        <Flex flexDirection="column" alignItems="center">
          <Flex>
            <Flex
              justifyContent="space-between"
              alignItems="center"
              minWidth={1000}
            >
              <Text fontWeight="bold" fontSize={30}>
                Emails
              </Text>
              <Text>Opens</Text>
              <Text>Views</Text>
              <CreateEmailModal appendEmail={props.appendEmail} />
            </Flex>
          </Flex>
          {props.emails.map(email => (
            <Flex key={email.id}>
              <Flex
                key={email.id}
                justifyContent="space-between"
                alignItems="center"
                minWidth={1000}
              >
                <Text>{email.name}</Text>
                <Text>{email.opens}</Text>
                <Text>{email.clicks}</Text>
                <Link to={`/email/${email.id}`} state={{ email: email }}>
                  <Button variant="solid" size="md" href="/test">
                    View Details
                  </Button>
                </Link>
              </Flex>
            </Flex>
          ))}
        </Flex>
      </ChakraProvider>
    </>
  );
};

export default EmailsTable;
