// this model will have a post requst built in and if it gets a 200 message it will call the callback function and fass the email stuff
// i have to validate the fields before sending it. I think i can do that in line in the feilds
import { useRef } from 'react';
import React from 'react';
import { useForm } from 'react-hook-form';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  Button,
  useToast,
} from '@chakra-ui/react';
// import { createSite } from '@/lib/db';
// import { useAuth } from '@/lib/auth';
// import { mutate } from 'swr';

// import Fetcher from 'pages/utils/fetcher';

//this should take call back i think
const CreateEmailModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef();
  const toast = useToast();
  // const auth = useAuth();
  const { register, handleSubmit, watch } = useForm();

  const onCreateSite = ({ name, url }) => {
    console.log(name);
  };

  //   const onCreateSite = ({ name, url }) => {
  //     const newSite = {
  //       authorId: auth.user.uid,
  //       createdAt: new Date().toISOString(),
  //       name,
  //       url,
  //     };

  //     const { id } = createSite(newSite);
  //     toast({
  //       title: 'Success!',
  //       description: "We've added your site.",
  //       status: 'success',
  //       duration: 5000,
  //       isClosable: true,
  //     });
  //     mutate(
  //       ['/api/sites', auth.user.token],
  //       async data => ({
  //         sites: [...data.sites, { id, ...newSite }],
  //       }),
  //       false
  //     );

  //     onClose();
  //   };

  return (
    <>
      <Button onClick={onOpen}>click me</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onCreateSite)}>
          <ModalHeader fontWeight="bold">Add Site</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                // ref={initialRef}
                placeholder="My site"
                name="name"
                // ref={register({ required: 'Required' })} //required: true
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Link</FormLabel>
              <Input
                placeholder="https://website.com"
                name="url"
                ref={register({ required: 'Required' })}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose} fontWeight="medium">
              Cancel
            </Button>
            <Button
              backgroundColor="#99FFFE"
              color="#194D4C"
              fontWeight="medium"
              type="submit"
            >
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateEmailModal;
