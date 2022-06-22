import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Textarea,
  FormControl,
  FormLabel,
  Input,
  useToast,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { postNewEmail } from '../../api/createEmailModal/postNewEmail';

const CreateEmailModal = ({ appendEmail }) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmitCreateEmail(values) {
    let response = await postNewEmail(values);
    reset();
    if (!response.ok) {
      toast({
        title: 'Error!',
        description: response.body.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    toast({
      title: 'Success!',
      description: "You'r nre email has been created",
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
    appendEmail(response.body.email);
    return;
  }

  return (
    <>
      <Button colorScheme="green" onClick={onOpen}>
        Create New Email
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onSubmitCreateEmail)}>
          <ModalHeader>Create An Email</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isInvalid={errors.name}>
              <FormLabel>Name</FormLabel>
              <Input
                id="name"
                placeholder="Welcome Email"
                {...register('name', {
                  required: 'This is required',
                  minLength: {
                    value: 4,
                    message: 'Minimum length should be 4',
                  },
                })}
              />
              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl mt={5} isInvalid={errors.name}>
              <FormLabel>Subject</FormLabel>
              <Input
                id="subject"
                placeholder="Welcome to Rejest.com"
                {...register('subject', {
                  required: 'This is required',
                  minLength: {
                    value: 4,
                    message: 'Minimum length should be 4',
                  },
                })}
              />
              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl mt={5} isInvalid={errors.name}>
              <FormLabel>Body</FormLabel>
              <Textarea
                id="dody"
                placeholder="We're very excited to have you apart of the team"
                {...register('body', {
                  required: 'This is required',
                  minLength: {
                    value: 4,
                    message: 'Minimum length should be 4',
                  },
                })}
              />
              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="green"
              isLoading={isSubmitting}
              type="submit"
              onClick={onClose}
              mr={2}
            >
              Create Email
            </Button>
            <Button colorScheme="blue" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateEmailModal;
