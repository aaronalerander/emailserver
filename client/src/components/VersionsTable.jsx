import React from 'react';

import { ChakraProvider, Flex, Text, Button, useToast } from '@chakra-ui/react';

import EditEmailModal from './EditEmailModal';
import { useState } from 'react';

const VersionsTable = props => {
  const toast = useToast();
  const [email] = useState(props.email);
  const [currentTemplateId, setCurrentTemplateId] = useState(
    props.email.currentTemplateId
  );

  async function setDefault(templateId) {
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
          <Flex>
            <Flex
              justifyContent="space-between"
              alignItems="center"
              minWidth={1000}
            >
              <Text fontWeight="bold" fontSize={30}>
                {props.email.name}
              </Text>
              <Text>Opens</Text>
              <Text>Views</Text>
              <>
                {currentTemplateId === null ? (
                  console.log('not ready')
                ) : (
                  <EditEmailModal
                    appendVersion={props.appendVersion}
                    templateId={currentTemplateId}
                    email={email}
                    setCurrentTemplateId={setCurrentTemplateId}
                  />
                )}
              </>
            </Flex>
          </Flex>
          {props.versions.map(version => (
            <Flex key={version.id}>
              <Flex
                key={version.id}
                justifyContent="space-between"
                alignItems="center"
                minWidth={1000}
              >
                <Text>{props.email.name + version.version}</Text>
                <Text>{version.opens}</Text>
                <Text>{version.clicks}</Text>
                <Button
                  variant="solid"
                  size="md"
                  href="/test"
                  onClick={() => setDefault(version.id)}
                  isDisabled={version.id === currentTemplateId}
                >
                  Revert
                </Button>
              </Flex>
            </Flex>
          ))}
        </Flex>
      </ChakraProvider>
    </>
  );
};

export default VersionsTable;
