import React from 'react';
import { Flex, Text, Box } from '@chakra-ui/react';
import EditEmailModal from '../../modals/EditEmailModal';

const VersionsTableHeader = ({
  email,
  appendVersion,
  templateId,
  setCurrentTemplateId,
}) => {
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
              {email.name}
            </Text>
            <Text>Opens</Text>
            <Text>Views</Text>

            <EditEmailModal
              appendVersion={appendVersion}
              templateId={templateId}
              email={email}
              setCurrentTemplateId={setCurrentTemplateId}
            />
          </Flex>
        </Box>
      </Flex>
    </>
  );
};

export default VersionsTableHeader;
