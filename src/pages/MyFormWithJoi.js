import { ErrorMessage, Field, Form, Formik } from "formik";

import Joi from "joi";

const validationSchema = Joi.object({
  name: Joi.string().required().label("Name"),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .label("Email"),
  password: Joi.string().min(8).required().label("Password"),
});

const validate = (values) => {
  const { error } = validationSchema.validate(values, { abortEarly: false });
  if (!error) return {};

  const errors = {};
  error.details.forEach((detail) => {
    errors[detail.path[0]] = detail.message;
  });
  return errors;
};

const MyFormWithJoi = () => {
  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const handleSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      console.log(values);
      setSubmitting(false);
    }, 1000);
  };

  return (
    <div>
      <h1>Formik Form with Joi Validation</h1>
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={handleSubmit}
      >
        <Form>
          <div>
            <label>Name:</label>
            <Field type="text" name="name" />
            <ErrorMessage name="name" component="div" className="error" />
          </div>
          <div>
            <label>Email:</label>
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="div" className="error" />
          </div>
          <div>
            <label>Password:</label>
            <Field type="password" name="password" />
            <ErrorMessage name="password" component="div" className="error" />
          </div>
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};

export default MyFormWithJoi;
