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

const EmailsTable = props => {
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
                Emails
              </Text>
              <Text>Opens</Text>
              <Text>Views</Text>
              <Button variant="solid" size="lg" colorScheme="green">
                {/* either this is the model. i will need to pass it the call back function  */}
                Create Email
              </Button>
              {/* <CreateEmailModal>Add Your First Site</CreateEmailModal> */}
              <CreateEmailModal appendEmail={props.appendEmail} />
            </Flex>
          </Flex>

          {props.emails.map(email => (
            <Flex key={email.id}>
              <Flex
                key={email.id}
                justifyContent="space-between"
                alignItems="center"
                minWidth={1000}
              >
                {/* using state is a cheat that you probaly should be using */}
                <Text>{email.name}</Text>
                <Text>{email.opens}</Text>
                <Text>{email.clicks}</Text>
                <Link to={`/email/${email.id}`} state={{ email: email }}>
                  <Button variant="solid" size="md" href="/test">
                    View Details
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

export default EmailsTable;
