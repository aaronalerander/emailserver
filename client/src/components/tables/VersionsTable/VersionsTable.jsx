import React from 'react';
import { ChakraProvider, Flex, useToast, Box } from '@chakra-ui/react';

import { useState } from 'react';
import VersionsTableRow from './VersionsTableRow';
import VersionsTableHeader from './VersionsTableHeader';

const VersionsTable = ({ email, versions, appendVersion }) => {
  const toast = useToast();
  const [currentTemplateId, setCurrentTemplateId] = useState(
    email.currentTemplateId
  );

  async function setTemplateAsDefault(templateId) {
    let requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        templateId: templateId,
      }),
    };

    try {
      let response = await fetch(
        `http://localhost:9000/email/${email.id}`,
        requestOptions
      );

      let body = await response.json();

      if (!response.ok) {
        toast({
          title: 'Error!',
          description: body.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        return;
      }

      setCurrentTemplateId(body.template.id);
      toast({
        title: 'Success!',
        description: `Sucessfuly reverted to version ${body.template.version}`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {}
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
