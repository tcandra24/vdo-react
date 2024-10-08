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
import Header from "../../../components/Headers/Header";
import AdminLayout from "../../../layouts/Admin";
import { useEffect, useReducer } from "react";
import useInput from "../../../hooks/useInput";

import { toast } from "react-toastify";

import cookies from "js-cookie";

import {
  categoryReducer,
  INITIAL_STATE,
} from "../../../reducers/categoryReducer";

import api from "../../../services/api";
import { useNavigate, useParams } from "react-router-dom";

const Create = () => {
  const name = useInput("");
  const [state, dispatch] = useReducer(categoryReducer, INITIAL_STATE);

  const token = cookies.get("token");
  const navigate = useNavigate();

  const { id } = useParams();

  const getDetailCategory = async () => {
    dispatch({ type: "GET_CATEGORY" });

    try {
      api.defaults.headers.common["Authorization"] = token;
      const { data } = await api.get(`/api/categories/${id}`);

      dispatch({ type: "GET_CATEGORY_SUCCESS" });

      name.setValue(data.data.name);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getDetailCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submit = async (e) => {
    dispatch({ type: "UPDATE_CATEGORIES" });

    try {
      e.preventDefault();

      api.defaults.headers.common["Authorization"] = token;
      const { data } = await api.put(`/api/categories/${id}`, {
        name: name.value,
      });

      if (!data.success) {
        throw new Error(data.message);
      }

      toast.success(data.message);

      dispatch({ type: "UPDATE_CATEGORIES_SUCCESS" });

      navigate("/categories", { replace: true });
    } catch (error) {
      if (Array.isArray(error.response.data.message)) {
        dispatch({
          type: "UPDATE_CATEGORIES_FAILURE",
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
                <h3 className="mb-0">Edit Category</h3>
              </CardHeader>
              {state.response.errors && state.response.errors.length > 0 && (
                <Alert className="font-weight-bold m-3" color="danger">
                  <ul className="m-0 list-group" style={{ listStyle: "none" }}>
                    {state.response.errors.map((error, index) => (
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
                        placeholder="Category Name"
                        value={name.value}
                        onChange={name.onChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Button color="primary" disabled={state.loading}>
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
