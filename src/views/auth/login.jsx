import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  Alert,
} from "reactstrap";
import cookies from "js-cookie";

import api from "../../services/api";
import { AuthContext } from "../../context/Auth";

import AuthLayout from "../../layouts/Auth";

const Login = () => {
  const navigate = useNavigate();
  const { setIsAuthenticate } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [validation, setValidation] = useState([]);

  const login = async (e) => {
    setLoading(true);
    try {
      e.preventDefault();
      const { data } = await api.post("/api/login", {
        email,
        password,
      });

      if (!data.success) {
        throw new Error(data.message);
      }

      setLoading(false);

      toast.success(data.message);

      cookies.set("token", data.data.token);
      cookies.set("user", JSON.stringify(data.data.user));

      setIsAuthenticate(true);

      navigate("/dashboard", { replace: true });
    } catch (error) {
      if (Array.isArray(error.response.data.message)) {
        setValidation(error.response.data.message);
      } else {
        toast.error(error.response.data.message);
      }

      setLoading(false);
    }
  };

  return (
    <>
      <AuthLayout>
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            <CardHeader className="bg-transparent">
              <div className="text-muted text-center mt-2 mb-2">
                <h1>Login</h1>
              </div>
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-5">
              {validation.length > 0 && (
                <Alert className="font-weight-bold" color="danger">
                  <ul className="m-0 list-group" style={{ listStyle: "none" }}>
                    {validation.map((validate, index) => (
                      <li key={index}>{validate.message}</li>
                    ))}
                  </ul>
                </Alert>
              )}
              <Form role="form" onSubmit={login}>
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Email"
                      type="email"
                      autoComplete="new-email"
                      value={email}
                      invalid
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Password"
                      type="password"
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </InputGroup>
                </FormGroup>
                <div className="custom-control custom-control-alternative custom-checkbox">
                  <input
                    className="custom-control-input"
                    id=" customCheckLogin"
                    type="checkbox"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor=" customCheckLogin"
                  >
                    <span className="text-muted">Remember me</span>
                  </label>
                </div>
                <div className="text-center">
                  <Button
                    className="my-4"
                    color="primary"
                    type="submit"
                    disabled={loading}
                  >
                    Sign in
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
          <Row className="mt-3">
            <Col className="text-lest" xs="6">
              <Link className="text-light" to="/register">
                <small>Create new account</small>
              </Link>
            </Col>
          </Row>
        </Col>
      </AuthLayout>
    </>
  );
};

export default Login;
