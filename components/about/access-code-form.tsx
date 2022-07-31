import {
  FormControl,
  FormErrorMessage,
  Button,
  Input,
  useToast,
  Text,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
  useClipboard,
  VStack,
} from '@chakra-ui/react';
import { signIn } from 'next-auth/react';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { type Dispatch, type SetStateAction, useState } from 'react';
import { useRouter } from 'next/router';

interface Values {
  inputStr: string;
}

interface FormProps {
  isToGetAccessCode: boolean;
  setIsToGetAccessCode: Dispatch<SetStateAction<boolean>>;
}

function AccessCodeForm(props: FormProps) {
  const { isToGetAccessCode, setIsToGetAccessCode } = props;

  const [accessCodeValue, setAccessCodeValue] = useState('');
  const { hasCopied, onCopy } = useClipboard(accessCodeValue);

  const toast = useToast();
  const router = useRouter();

  const validateInputValue = (value: string) => {
    let error: string;
    if (!value) {
      error = 'The input value is required';
    } else if (isToGetAccessCode && value !== 'admin') {
      error = 'Sorry! access password is error 😱';
    }
    return error;
  };

  const getAccessToken = async (
    values: Values,
    actions: FormikHelpers<Values>,
  ) => {
    const result = await signIn('credentials', {
      redirect: false,
      accessCode: values.inputStr,
    });

    if (result && result.ok) {
      !isToGetAccessCode && router.replace('/about/profile');
    }

    if (result.error) {
      toast({
        title: result.error,
        position: 'top',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }

    actions.setSubmitting(false);
  };

  const generateAccessCode = async (
    values: Values,
    actions: FormikHelpers<Values>,
  ) => {
    const response = await fetch('/api/auth/generate-code', {
      method: 'POST',
      body: JSON.stringify({ password: values.inputStr }),
      headers: { 'Content-Type': 'application/json' },
    });
    const result = await response.json();

    if (result.error) {
      toast({
        title: result.error,
        position: 'top',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } else {
      setAccessCodeValue(result.data.code);
    }

    actions.setSubmitting(false);
  };

  const submitHandler = (values: Values, actions: FormikHelpers<Values>) => {
    isToGetAccessCode && generateAccessCode(values, actions);
    !isToGetAccessCode && getAccessToken(values, actions);
  };

  return (
    <Formik initialValues={{ inputStr: '' }} onSubmit={submitHandler}>
      {props => (
        <Form>
          <Field name="inputStr" validate={validateInputValue}>
            {({ field, form }) => (
              <FormControl
                isInvalid={form.errors.inputStr && form.touched.inputStr}
              >
                <Input
                  {...field}
                  placeholder={
                    isToGetAccessCode ? '请输入密码 admin' : '请输入访问码'
                  }
                />
                <FormErrorMessage>{form.errors.inputStr}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          {isToGetAccessCode && !!accessCodeValue && (
            <VStack mt="5">
              <Text color="teal.400" w="full">
                你的访问码:
              </Text>
              <Flex mb={2} w="full">
                <Input value={accessCodeValue} isReadOnly placeholder="" />
                <Button onClick={onCopy} ml={2}>
                  {hasCopied ? 'Copied' : 'Copy'}
                </Button>
              </Flex>
            </VStack>
          )}
          <Flex justifyContent="space-between" alignItems="end">
            <Button
              mt={4}
              colorScheme="teal"
              isLoading={props.isSubmitting}
              type="submit"
            >
              确定
            </Button>
            <Text
              textDecor="underline"
              cursor="pointer"
              color="blue"
              onClick={() => {
                setIsToGetAccessCode(!isToGetAccessCode);
                props.setFieldValue('inputStr', '');
              }}
            >
              {isToGetAccessCode ? '访问Wcong_H的简历' : '获取访问码'}
            </Text>
          </Flex>
        </Form>
      )}
    </Formik>
  );
}

function AccessFormModal(props: { isOpen: boolean; onClose: () => void }) {
  const [isToGetAccessCode, setIsToGetAccessCode] = useState(false);
  const { isOpen = false, onClose } = props;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {isToGetAccessCode ? '获取访问码' : '访问Wcong_H的简历'}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <AccessCodeForm
            isToGetAccessCode={isToGetAccessCode}
            setIsToGetAccessCode={setIsToGetAccessCode}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default AccessFormModal;
