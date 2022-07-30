import {
  FormControl,
  FormErrorMessage,
  Button,
  Input,
  useToast,
} from '@chakra-ui/react';
import { signIn } from 'next-auth/react';
import { Field, Form, Formik, FormikHelpers } from 'formik';

interface Values {
  accessCode: string;
}

function AccessCodeForm({ callback }: { callback?: () => void }) {
  const toast = useToast();
  function validateCode(value: string) {
    let error: string;
    if (!value) {
      error = 'The access code is required';
    } else if (value.toLowerCase() !== 'admin') {
      error = 'Sorry! access code is error 😱';
    }
    return error;
  }

  async function getAccessToken(
    values: Values,
    actions: FormikHelpers<Values>,
  ) {
    const result = await signIn('credentials', {
      redirect: false,
      accessCode: values.accessCode,
    });

    if (result && result.ok) {
      callback && callback();
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
  }

  return (
    <Formik initialValues={{ accessCode: '' }} onSubmit={getAccessToken}>
      {props => (
        <Form>
          <Field name="accessCode" validate={validateCode}>
            {({ field, form }) => (
              <FormControl
                isInvalid={form.errors.accessCode && form.touched.accessCode}
              >
                <Input {...field} placeholder="请输入访问码 admin" />
                <FormErrorMessage>{form.errors.accessCode}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Button
            mt={4}
            colorScheme="teal"
            isLoading={props.isSubmitting}
            type="submit"
          >
            确定
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default AccessCodeForm;
