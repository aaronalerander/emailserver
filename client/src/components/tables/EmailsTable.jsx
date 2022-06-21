import React from 'react';
import { ChakraProvider, Flex, Text, Button, Box } from '@chakra-ui/react';

import { Link } from 'react-router-dom';
import CreateEmailModal from '../modals/CreateEmailModal';

const EmailsTable = ({ appendEmail, emails }) => {
  return (
    <>
      <ChakraProvider resetCSS>
        <Flex flexDirection="column" alignItems="center">
          <Box
            border="1px"
            borderColor="gray.200"
            borderRadius="10"
            p={5}
            mt={5}
          >
            <Flex>
              <Box
                borderBottom="1px"
                borderColor="gray.200"
                mt={5}
                mb={5}
                pb={2}
              >
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
                  <CreateEmailModal appendEmail={appendEmail} />
                </Flex>
              </Box>
            </Flex>

            {emails.map(email => (
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
                    <Button
                      colorScheme="blue"
                      variant="solid"
                      size="md"
                      href="/test"
                    >
                      View Details
                    </Button>
                  </Link>
                </Flex>
              </Flex>
            ))}
          </Box>
        </Flex>
      </ChakraProvider>
    </>
  );
};

export default EmailsTable;
