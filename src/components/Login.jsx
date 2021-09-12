import { Button, Card, Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link, useHistory, Redirect } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login, currentUser } = useAuth();
  const { history } = useHistory();

  if (currentUser) {
    console.log("authenticated");
    return <Redirect to="/" />;
  }

  const initialValues = {
    email: "",
    password: ""
  };

  const onSubmit = async (values) => {
    await login(values.email, values.password);
    history.push("/");
  };

  const validationSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(6)
  });

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema
  });

  return (
    <>
      <Card className="mt-5 mx-5 p-3" bg="light" style={{ maxWidth: "500px" }}>
        <h1 className="my-3 text-center text-primary">Login</h1>
        <Form onSubmit={formik.handleSubmit}>
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
        <div className="text-center mt-3 text-info">Forgot password ?</div>
      </Card>
      <div className="text-center mt-3">
        Need an account ? <Link to="/signup">Sign up</Link>
      </div>
    </>
  );
};

export default Login;
