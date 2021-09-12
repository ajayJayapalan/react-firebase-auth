import { Button, Card, Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Signup = () => {
  const { signup } = useAuth();
  const history = useHistory();

  const initialValues = {
    name: "",
    email: "",
    password: ""
  };

  const validationSchema = yup.object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(6)
  });

  const onSubmit = async (values) => {
    await signup(values.name, values.email, values.password);
    history.push("/");
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema
  });

  return (
    <>
      <Card className="mt-5 mx-5 p-3" bg="light" style={{ maxWidth: "500px" }}>
        <h1 className="my-3 text-center text-primary">Signup</h1>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              {...formik.getFieldProps("name")}
              name="name"
              type="text"
              required
            />
            {formik.touched.name && formik.errors.name ? (
              <Form.Text className="text-danger">
                {formik.errors.name}
              </Form.Text>
            ) : null}
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              {...formik.getFieldProps("email")}
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              type="email"
              required
            />
            {formik.touched.email && formik.errors.email ? (
              <Form.Text className="text-danger">
                {formik.errors.email}
              </Form.Text>
            ) : null}
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              {...formik.getFieldProps("password")}
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              type="password"
              required
            />
            {formik.touched.password && formik.errors.password ? (
              <Form.Text className="text-danger">
                {formik.errors.password}
              </Form.Text>
            ) : null}
          </Form.Group>
          <Button
            disabled={formik.isSubmitting || !formik.errors}
            type="submit"
            className="mt-4 w-100"
          >
            {"Submit"}
          </Button>
        </Form>
      </Card>
      <div className="text-center mt-3">
        Already have an account ? <Link to="/login">Login</Link>
      </div>
    </>
  );
};

export default Signup;
