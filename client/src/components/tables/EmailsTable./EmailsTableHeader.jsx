import React from 'react';
import { Flex, Text, Box } from '@chakra-ui/react';
import CreateEmailModal from '../../modals/CreateEmailModal';

const EmailsTableHeader = ({ appendEmail }) => {
  return (
    <>
      <Flex>
        <Box borderBottom="1px" borderColor="gray.200" mt={5} mb={5} pb={2}>
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
    </>
  );
};

export default EmailsTableHeader;
