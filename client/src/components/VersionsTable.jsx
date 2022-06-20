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
  Box,
} from '@chakra-ui/react';

import { EmailIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import CreateEmailModal from './CreateEmailModal';
//edit email modal

const VersionsTable = props => {
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
              <Button variant="solid" size="lg" colorScheme="green">
                {/* either this is the model. i will need to pass it the call back function  */}
                Edit Template
              </Button>
              {/* <CreateEmailModal>Add Your First Site</CreateEmailModal> */}
              <CreateEmailModal appendVersion={props.appendVersion} />
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
                <Link to={`/email/${version.id}`} state={{ version: version }}>
                  <Button variant="solid" size="md" href="/test">
                    Set Default
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

export default VersionsTable;
