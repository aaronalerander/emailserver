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
} from '@chakra-ui/react';
import { EmailIcon, CalendarIcon } from '@chakra-ui/icons';

const Header = () => (
  <ChakraProvider resetCSS>
    <Flex
      justifyContent="space-between"
      alignItems="center"
      borderBottom="2px"
      borderColor="gray.200"
      p={(0, 5, 0, 5)}
    >
      <Flex justifyContent="flex-start" alignItems="center">
        <CalendarIcon mr={3} boxSize={7} />
        <Text fontSize={25} fontWeight="bold">
          AARON'S EMAIL MANAGER
        </Text>
      </Flex>
    </Flex>
  </ChakraProvider>
);

export default Header;
