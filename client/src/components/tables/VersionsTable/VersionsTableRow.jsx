import React from 'react';
import { Flex, Text, Button } from '@chakra-ui/react';

const VersionsTableRow = ({
  version,
  email,
  setTemplateAsDefault,
  currentTemplateId,
}) => {
  return (
    <>
      <Flex key={version.id}>
        <Flex
          key={version.id}
          justifyContent="space-between"
          alignItems="center"
          minWidth={1000}
          mb={5}
        >
          <Text>{email.name + version.version}</Text>
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
    </>
  );
};

export default VersionsTableRow;
