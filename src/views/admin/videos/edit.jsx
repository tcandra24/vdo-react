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
} from "reactstrap";
// core components
import Header from "components/Headers/Header";
import AdminLayout from "layouts/Admin";
import { useEffect, useState } from "react";

import cookies from "js-cookie";

import api from "services/api";
import { useNavigate, useParams } from "react-router-dom";

const Create = () => {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  const token = cookies.get("token");
  const navigate = useNavigate();

  const { id } = useParams();

  const getDetailVideo = async () => {
    api.defaults.headers.common["Authorization"] = token;
    const { data } = await api.get(`/api/videos/${id}`);

    setName(data.data.name);
    setLink(data.data.link);
  };

  useEffect(() => {
    getDetailVideo();
  }, []);

  const submit = async (e) => {
    try {
      e.preventDefault();

      api.defaults.headers.common["Authorization"] = token;
      const { data } = await api.put(`/api/videos/${id}`, {
        name,
        link,
      });

      if (!data.success) {
        throw new Error(data.message);
      }

      navigate("/videos", { replace: true });
    } catch (error) {
      console.log(error);
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
                <h3 className="mb-0">Videos</h3>
              </CardHeader>
              <Form onSubmit={submit} className="m-3">
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="name">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder=""
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="link">Link</Label>
                      <Input
                        id="link"
                        name="link"
                        placeholder=""
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
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
