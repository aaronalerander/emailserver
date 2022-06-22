import { ChakraProvider, Flex, useToast, Box } from '@chakra-ui/react';
import React from 'react';
import { useState } from 'react';
import VersionsTableRow from './VersionsTableRow';
import VersionsTableHeader from './VersionsTableHeader';
import { putEmail } from '../../../api/versionsTable/putEmail';

const VersionsTable = ({ email, versions, appendVersion }) => {
  const toast = useToast();
  const [currentTemplateId, setCurrentTemplateId] = useState(
    email.currentTemplateId
  );

  async function setTemplateAsDefault(templateId) {
    let response = await putEmail(templateId, email);
    if (!response.ok) {
      toast({
        title: 'Error!',
        description: response.body.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    toast({
      title: 'Success!',
      description: `Sucessfuly reverted to version ${response.body.template.version}`,
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
    setCurrentTemplateId(response.body.template.id);
    return;
  }

  return (
    <>
      <ChakraProvider resetCSS>
        <Flex flexDirection="column" alignItems="center">
          <Box
            border="1px"
            borderColor="gray.200"
            borderRadius="10"
            p={5}
            mt="20px"
          >
            <VersionsTableHeader
              email={email}
              appendVersion={appendVersion}
              templateId={currentTemplateId}
              setCurrentTemplateId={setCurrentTemplateId}
            />

            {versions.map(version => (
              <VersionsTableRow
                key={version.id}
                version={version}
                email={email}
                setTemplateAsDefault={setTemplateAsDefault}
                currentTemplateId={currentTemplateId}
              />
            ))}
          </Box>
        </Flex>
      </ChakraProvider>
    </>
  );
};

export default VersionsTable;
