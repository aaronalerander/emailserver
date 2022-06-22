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
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { fetchCurrentVersionInfo } from '../../api/editEmailModal/fetchCurrentVersionInfo';
import { postEditedEmail } from '../../api/editEmailModal/postEditedEmail';

const EditEmailModal = ({
  appendVersion,
  templateId,
  email,
  setCurrentTemplateId,
}) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    fetchCurrentVersionInfo(templateId, reset);
  }, [templateId, reset]);

  async function onSubmitEditedTemplate(values) {
    let response = await postEditedEmail(values, email);
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
      description: "We've edited your template and added a version.",
      status: 'success',
      duration: 5000,
      isClosable: true,
    });

    appendVersion(response.body.template);
    setCurrentTemplateId(response.body.template.id);
    return;
  }

  return (
    <>
      <Button colorScheme="green" onClick={onOpen}>
        Edit Email
      </Button>
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
            <FormControl isInvalid={errors.name} mt={5}>
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
              colorScheme="green"
              isLoading={isSubmitting}
              type="submit"
              onClick={onClose}
              mr={2}
            >
              Edit Email
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

export default EditEmailModal;
