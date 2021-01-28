import * as React from "react";
import { Formik, Form, Field } from "formik";
import { Button, LinearProgress } from "@material-ui/core";
import { TextField } from "formik-material-ui";
import * as Yup from "yup";

const Values = {
  email: "",
  password: "",
};

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});

export default function App() {
  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      }}
      validate={(values) => {
        const errors = {};
        if (!values.email) {
          errors.email = "Required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        }
        return errors;
      }}
      validationSchema={SignupSchema}
      onSubmit={(values, { resetForm, setSubmitting }) => {
        setTimeout(() => {
          setSubmitting(false);
          resetForm({ values: "" });
          alert(JSON.stringify(values, null, 2));
        }, 500);
      }}>
      {({ submitForm, isSubmitting }) => (
        <Form>
          <br />
          <Field
            variant='outlined'
            size='small'
            component={TextField}
            name='firstName'
            type='text'
            label='firstName'
          />
          <br />
          <Field
            variant='outlined'
            size='small'
            component={TextField}
            name='lastName'
            type='text'
            label='lastName'
          />
          <Field
            variant='outlined'
            size='small'
            component={TextField}
            name='email'
            type='email'
            label='Email'
          />
          <br />
          <Field
            variant='outlined'
            size='small'
            component={TextField}
            type='password'
            label='Password'
            name='password'
          />
          <br />
          {isSubmitting && <LinearProgress />}
          <br />
          <Button
            variant='outlined'
            color='primary'
            disabled={isSubmitting}
            onClick={submitForm}>
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
}
