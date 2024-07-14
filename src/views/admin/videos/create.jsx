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
import { useEffect, useReducer } from "react";
import useInput from "hooks/useInput";

import { toast } from "react-toastify";

import cookies from "js-cookie";

import {
  videoReducer,
  INITIAL_STATE as INITIAL_STATE_VIDEO,
} from "reducers/videoReducer";
import {
  categoryReducer,
  INITIAL_STATE as INITIAL_STATE_CATEGORY,
} from "reducers/categoryReducer";

import api from "services/api";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const name = useInput("");
  const videoId = useInput("");
  const categoryId = useInput("");

  const [stateVideo, dispatchVideo] = useReducer(
    videoReducer,
    INITIAL_STATE_VIDEO
  );
  const [stateCategory, dispatchCategory] = useReducer(
    categoryReducer,
    INITIAL_STATE_CATEGORY
  );

  const token = cookies.get("token");
  const navigate = useNavigate();

  const fetchCategories = async () => {
    dispatchCategory({ type: "FETCH_CATEGORIES" });

    try {
      const token = cookies.get("token");

      if (!token) return new Error("Token Not Found");

      api.defaults.headers.common["Authorization"] = token;

      const { data } = await api.get("/api/categories");

      if (!data.success) {
        throw new Error(data.message);
      }

      dispatchCategory({
        type: "FETCH_CATEGORIES_SUCCESS",
        payload: data.categories,
      });
    } catch (error) {
      dispatchCategory({
        type: "FETCH_CATEGORIES_FAILURE",
        payload: error.message,
      });
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const submit = async (e) => {
    dispatchVideo({ type: "ADD_VIDEOS" });

    try {
      e.preventDefault();

      api.defaults.headers.common["Authorization"] = token;
      const { data } = await api.post("/api/videos", {
        name: name.value,
        video_id: videoId.value,
        category_id: categoryId.value,
      });

      if (!data.success) {
        throw new Error(data.message);
      }

      toast.success(data.message);

      dispatchVideo({ type: "ADD_VIDEOS_SUCCESS" });

      navigate("/videos", { replace: true });
    } catch (error) {
      if (Array.isArray(error.response.data.message)) {
        dispatchVideo({
          type: "ADD_VIDEOS_FAILURE",
          payload: error.response.data.message,
        });
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
                <h3 className="mb-0">Videos</h3>
              </CardHeader>
              {stateVideo.response.errors &&
                stateVideo.response.errors.length > 0 && (
                  <Alert className="font-weight-bold m-3" color="danger">
                    <ul
                      className="m-0 list-group"
                      style={{ listStyle: "none" }}
                    >
                      {stateVideo.response.errors.map((error, index) => (
                        <li key={index}>{error.message}</li>
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
                        placeholder=""
                        value={name.value}
                        onChange={name.onChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="name">Category</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder=""
                        type="select"
                        value={categoryId.value}
                        onChange={categoryId.onChange}
                      >
                        <option value="">Choose Category</option>
                        {stateCategory.categories &&
                          stateCategory.categories.map((category) => (
                            <option key={category.id} value={category.id}>
                              {category.name}
                            </option>
                          ))}
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="link">Video Id</Label>
                      <Input
                        id="link"
                        name="link"
                        placeholder=""
                        value={videoId.value}
                        onChange={videoId.onChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Button
                  color="primary"
                  disabled={stateVideo.loading || stateCategory.loading}
                >
                  Send
                </Button>
              </Form>
            </Card>
          </div>
        </Row>
      </Container>
    </AdminLayout>
  );
};

export default Create;
