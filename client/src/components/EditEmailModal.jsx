import { useForm } from 'react-hook-form';
import React, { useState, useEffect } from 'react';
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
  const currentTemplate = props.currentTemplate;
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      subject: currentTemplate.Subject,
      textbody: currentTemplate.HtmlBody,
    },
  });

  // useEffect(() => {
  //   console.log(currentTemplate);
  //   reset({
  //     subject: currentTemplate.Subject,
  //     textbody: currentTemplate.HtmlBody,
  //   });
  // }, [currentTemplate]);

  function testFuc() {
    console.log('running my funciton');
    reset({
      subject: currentTemplate.Subject,
      textbody: currentTemplate.HtmlBody,
    });
  }

  //   useEffect(() => {
  //     console.log(currentTemplate);
  //     reset({
  //       subject: currentTemplate.Subject,
  //       textbody: currentTemplate.HtmlBody,
  //     });
  //   }, [currentTemplate]);

  //   useEffect(() => {
  //     console.log(currentTemplate);
  //     reset({
  //       subject: currentTemplate.Subject,
  //       textbody: currentTemplate.HtmlBody,
  //     });
  //   }, []);

  async function onSubmit(values) {
    // console.log(props.template.Subject);
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

      if (response.ok) {
        toast({
          title: 'Success!',
          description: "We've edited you template and added a version.",
          status: 'success',
          duration: 5000,
          isClosable: true,
        });

        props.appendVersion(body.template);
        props.setDefault(body.template.id);
        testFuc();
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
          {/* better name then onSubmit */}
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

export default CreateEmailModal;
