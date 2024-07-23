import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  CardHeader,
  Col,
  Alert,
} from "reactstrap";

import api from "../../services/api";

import AuthLayout from "../../layouts/Auth";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [validation, setValidation] = useState([]);

  const register = async (e) => {
    setLoading(true);
    try {
      e.preventDefault();
      const { data } = await api.post("/api/register", {
        name,
        email,
        password,
      });

      if (!data.success) {
        throw new Error(data.message);
      }

      setLoading(false);

      toast.success(data.message);

      navigate("/login", { replace: true });
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
                <h1>Register</h1>
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
              <Form role="form" onSubmit={register}>
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-single-02" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Name"
                      type="text"
                      autoComplete="new-name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </InputGroup>
                </FormGroup>
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
                <div className="text-center">
                  <Button
                    className="my-4"
                    color="primary"
                    type="submit"
                    disabled={loading}
                  >
                    Register
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </AuthLayout>
    </>
  );
};

export default Register;
