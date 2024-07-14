import {
  Alert,
  Card,
  CardHeader,
  CardFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Container,
  Row,
} from "reactstrap";
// core components
import Header from "components/Headers/Header";
import AdminLayout from "layouts/Admin";
import { useEffect, useReducer } from "react";

import { userReducer, INITIAL_STATE } from "reducers/userReducer";

import cookies from "js-cookie";
import api from "services/api";

const Index = () => {
  const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);

  const fetchUsers = async () => {
    dispatch({ type: "FETCH_USERS" });

    try {
      const token = cookies.get("token");

      if (!token) return new Error("Token Not Found");

      api.defaults.headers.common["Authorization"] = token;

      const { data } = await api.get("/api/users");

      if (!data.success) {
        throw new Error(data.message);
      }

      dispatch({ type: "FETCH_USERS_SUCCESS", payload: data.users });
    } catch (error) {
      dispatch({ type: "FETCH_USERS_FAILURE", payload: error.message });
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

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
                <h3 className="mb-0">Users</h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                  </tr>
                </thead>
                <tbody>
                  {state.loading && (
                    <tr>
                      <td colSpan="2">
                        <Alert
                          className="text-center font-weight-bold"
                          color="info"
                        >
                          Loading
                        </Alert>
                      </td>
                    </tr>
                  )}

                  {state.users &&
                    !state.loading &&
                    state.users.length === 0 && (
                      <tr>
                        <td colSpan="2">
                          <Alert
                            className="text-center font-weight-bold"
                            color="info"
                          >
                            User is Empty
                          </Alert>
                        </td>
                      </tr>
                    )}

                  {!state.loading &&
                    state.users &&
                    state.users.length > 0 &&
                    state.users.map((user, index) => (
                      <tr key={index}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                      </tr>
                    ))}
                </tbody>
              </Table>
              <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className="disabled">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </AdminLayout>
  );
};

export default Index;
