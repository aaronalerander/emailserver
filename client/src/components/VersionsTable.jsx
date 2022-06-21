import React from 'react';

import {
  ChakraProvider,
  Stack,
  Avatar,
  AvatarBadge,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  FormLabel,
  Input,
  FormHelperText,
  FormErrorMessage,
  Switch,
  InputGroup,
  InputRightElement,
  Icon,
  Flex,
  Text,
  Button,
  useToast,
  Box,
} from '@chakra-ui/react';

import { EmailIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import EditEmailModal from './EditEmailModal';
import { useState, useEffect } from 'react';

//edit email modal
//i have to set and check the message, if good, change and toast, otherwise error toast dont change

//fetch the template data. store it. fetch when ever setCurrentTemplate is touched
//pass this template data as a prop to my modal.

const VersionsTable = props => {
  const toast = useToast();
  const [email, setEmail] = useState(props.email);
  //template data state
  //   const [currentTemplate, setCurrentTemplate] = useState(null);
  const [currentTemplateId, setCurrentTemplateId] = useState(
    props.email.currentTemplateId
  );
  //i have to pass down setCurrentTemplate

  //   useEffect(() => {
  //     async function fetchData() {
  //       // You can await here
  //       try {
  //         let responce = await fetch(
  //           `http://localhost:9000/template/${currentTemplateId}`
  //         );
  //         let body = await responce.json();

  //         //set curren template
  //         setCurrentTemplate(body);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }
  //     fetchData();
  //   }, [currentTemplateId, currentTemplate]); //current template id

  //useeffect ith currentTemplate as dependence

  //pass current template to modal

  async function setDefault(templateId) {
    console.log(templateId);
    //i have to send it
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
      //   setCurrentTemplate(body.template);

      toast({
        title: 'Success!',
        description: `Sucessfuly reverted to version ${body.template.version}`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {}

    //i have to check if it is  good
    //update disabled one

    //give the toast acording ly
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

              {/* <CreateEmailModal>Add Your First Site</CreateEmailModal> pass current template to modal
              create edit template modal.

              put logic inside there that does the same thing as creat email but with edit. one less feild because you cant name
              */}
              {/* <EditEmailModal
                appendVersion={props.appendVersion}
                subject={currentTemplate.Subject}
                textbody={currentTemplate.HtmlBody}
                email={email}
              /> */}

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
              {/* <EditEmailModal
                appendVersion={props.appendVersion}
                template={currentTemplate}
                email={email}
                setCurrentTemplateId={setCurrentTemplateId}
              /> */}
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
                {/* using state is a cheat that you probaly should be using */}
                <Text>{props.email.name + version.version}</Text>
                <Text>{version.opens}</Text>
                <Text>{version.clicks}</Text>

                <Button
                  variant="solid"
                  size="md"
                  href="/test" //!!!dont know if i needd this
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
