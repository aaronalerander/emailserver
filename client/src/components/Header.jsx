import { ChakraProvider, Flex, Text } from '@chakra-ui/react';
import { CalendarIcon } from '@chakra-ui/icons';
import React from 'react';

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
