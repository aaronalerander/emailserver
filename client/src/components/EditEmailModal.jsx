import { useForm } from 'react-hook-form';
import React, { useEffect } from 'react';
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

const EditEmailModal = props => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    async function fetchData() {
      try {
        let responce = await fetch(
          `http://localhost:9000/template/${props.templateId}`
        );
        let body = await responce.json();

        reset({
          subject: body.Subject,
          textbody: body.HtmlBody,
        });
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
    console.log('running');
  }, [props.templateId, reset]);

  async function onSubmitEditedTemplate(values) {
    let requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        subject: values.subject,
        textbody: values.textbody,
      }),
    };

    reset();

    try {
      let response = await fetch(
        `http://localhost:9000/template/${props.email.id}`,
        requestOptions
      );

      let body = await response.json();

      //start and see if can swap this
      if (response.ok) {
        toast({
          title: 'Success!',
          description: "We've edited you template and added a version.",
          status: 'success',
          duration: 5000,
          isClosable: true,
        });

        props.appendVersion(body.template);
        props.setCurrentTemplateId(body.template.id);
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
        <ModalContent as="form" onSubmit={handleSubmit(onSubmitEditedTemplate)}>
          <ModalHeader>Edit this Email</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <FormControl isInvalid={errors.name}>
              <FormLabel>Subject</FormLabel>
              <Input
                id="subject"
                ref={register}
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
                id="textbody"
                placeholder="We're very excited to have you apart of the team"
                ref={register}
                {...register('textbody', {
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

export default EditEmailModal;
