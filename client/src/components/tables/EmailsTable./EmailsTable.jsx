import { ChakraProvider, Flex, Box } from '@chakra-ui/react';
import React from 'react';
import EmailsTableHeader from './EmailsTableHeader';
import EmailsTableRow from './EmailsTableRow';

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
            <EmailsTableHeader appendEmail={appendEmail} />

            {emails.map(email => (
              <EmailsTableRow key={email.id} email={email} />
            ))}
          </Box>
        </Flex>
      </ChakraProvider>
    </>
  );
};

export default EmailsTable;
