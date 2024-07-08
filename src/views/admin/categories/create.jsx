import {
  Card,
  CardHeader,
  FormGroup,
  Label,
  Container,
  Row,
  Input,
  Col,
  Form,
  Button,
  Alert,
} from "reactstrap";
// core components
import Header from "components/Headers/Header";
import AdminLayout from "layouts/Admin";
import { useState } from "react";

import { toast } from "react-toastify";

import cookies from "js-cookie";

import api from "services/api";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [name, setName] = useState("");
  const [validation, setValidation] = useState([]);

  const token = cookies.get("token");
  const navigate = useNavigate();

  const submit = async (e) => {
    try {
      e.preventDefault();

      api.defaults.headers.common["Authorization"] = token;
      const { data } = await api.post("/api/categories", {
        name,
      });

      if (!data.success) {
        throw new Error(data.message);
      }

      toast.success(data.message);

      navigate("/categories", { replace: true });
    } catch (error) {
      if (Array.isArray(error.response.data.message)) {
        setValidation(error.response.data.message);
      } else {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <AdminLayout>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Add Category</h3>
              </CardHeader>
              {validation.length > 0 && (
                <Alert className="font-weight-bold m-3" color="danger">
                  <ul className="m-0 list-group" style={{ listStyle: "none" }}>
                    {validation.map((validate, index) => (
                      <li key={index}>{validate.message}</li>
                    ))}
                  </ul>
                </Alert>
              )}
              <Form onSubmit={submit} className="m-3">
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="name">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Category Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Button color="primary">Send</Button>
              </Form>
            </Card>
          </div>
        </Row>
      </Container>
    </AdminLayout>
  );
};

export default Create;
