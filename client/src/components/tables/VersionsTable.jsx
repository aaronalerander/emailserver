import React from 'react';

import {
  ChakraProvider,
  Flex,
  Text,
  Button,
  useToast,
  Box,
} from '@chakra-ui/react';

import EditEmailModal from '../modals/EditEmailModal';
import { useState } from 'react';

const VersionsTable = props => {
  const toast = useToast();
  const [email] = useState(props.email);
  const [currentTemplateId, setCurrentTemplateId] = useState(
    props.email.currentTemplateId
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
              </Box>
            </Flex>

            {props.versions.map(version => (
              <Flex key={version.id}>
                <Flex
                  key={version.id}
                  justifyContent="space-between"
                  alignItems="center"
                  minWidth={1000}
                  mb={5}
                >
                  <Text>{props.email.name + version.version}</Text>
                  <Text color="blue">{version.opens}</Text>
                  <Text color="red">{version.clicks}</Text>
                  <Button
                    colorScheme="blue"
                    variant="solid"
                    size="md"
                    href="/test"
                    onClick={() => setTemplateAsDefault(version.id)}
                    isDisabled={version.id === currentTemplateId}
                  >
                    Revert
                  </Button>
                </Flex>
              </Flex>
            ))}
          </Box>
        </Flex>
      </ChakraProvider>
    </>
  );
};

export default VersionsTable;
