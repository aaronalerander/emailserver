import { useForm } from 'react-hook-form';
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

const CreateEmailModal = props => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit(values) {
    let requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: values.name,
        subject: values.subject,
        textbody: values.body,
      }),
    };
    reset();

    try {
      let response = await fetch(
        'http://localhost:9000/templates',
        requestOptions
      );

      let body = await response.json();

      if (response.ok) {
        toast({
          title: 'Success!',
          description: "We've added your site.",
          status: 'success',
          duration: 5000,
          isClosable: true,
        });

        props.appendEmail(body.email);
      } else {
        toast({
          title: 'Error!',
          description: body.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
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

            <FormControl isInvalid={errors.name}>
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

            <FormControl isInvalid={errors.name}>
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
              colorScheme="teal"
              isLoading={isSubmitting}
              type="submit"
              onClick={onClose}
            >
              Secondary Action
            </Button>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateEmailModal;
