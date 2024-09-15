import {
  Alert,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Container,
  Row,
  Button,
} from "reactstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { Link } from "react-router-dom";
// core components
import Header from "../../../components/Headers/Header";
import AdminLayout from "../../../layouts/Admin";
import { useEffect, useReducer } from "react";

import { toast } from "react-toastify";

import {
  categoryReducer,
  INITIAL_STATE,
} from "../../../reducers/categoryReducer";
// import { getData } from "actions/categoriesAction";

import cookies from "js-cookie";
import api from "../../../services/api";

import { AuthContext } from "../../../context/Auth";
import { useContext } from "react";

const Index = () => {
  const [state, dispatch] = useReducer(categoryReducer, INITIAL_STATE);
  const { fetchDataDashboard } = useContext(AuthContext);

  const fetchCategories = async () => {
    dispatch({ type: "FETCH_CATEGORIES" });

    try {
      const token = cookies.get("token");

      if (!token) return new Error("Token Not Found");

      api.defaults.headers.common["Authorization"] = token;

      const { data } = await api.get("/api/categories");

      if (!data.success) {
        throw new Error(data.message);
      }

      dispatch({ type: "FETCH_CATEGORIES_SUCCESS", payload: data.categories });
    } catch (error) {
      dispatch({ type: "FETCH_CATEGORIES_FAILURE", payload: error.message });
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const confirmDelete = (id) => {
    withReactContent(Swal)
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
      })
      .then((result) => {
        if (result.isConfirmed) {
          deleteCategory(id);
        }
      });
  };

  const deleteCategory = async (id) => {
    dispatch({ type: "DELETE_CATEGORIES" });

    try {
      const token = cookies.get("token");

      if (!token) return new Error("Token Not Found");

      api.defaults.headers.common["Authorization"] = token;

      const { data } = await api.delete(`/api/categories/${id}`);

      if (!data.success) {
        throw new Error(data.message);
      }

      toast.success(data.message);

      dispatch({ type: "DELETE_CATEGORIES_SUCCESS" });

      fetchCategories();
      fetchDataDashboard();
    } catch (error) {
      dispatch({ type: "DELETE_CATEGORIES_FAILURE", payload: error.message });
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
                <h3 className="mb-0">Categories</h3>
              </CardHeader>
              <div className="m-3">
                <Link to="/categories/create">
                  <Button color="primary">Add Category</Button>
                </Link>
              </div>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col" />
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

                  {state.categories &&
                    !state.loading &&
                    state.categories.length === 0 && (
                      <tr>
                        <td colSpan="2">
                          <Alert
                            className="text-center font-weight-bold"
                            color="info"
                          >
                            Categories is Empty
                          </Alert>
                        </td>
                      </tr>
                    )}

                  {!state.loading &&
                    state.categories.length > 0 &&
                    state.categories.map((category, index) => (
                      <tr key={index}>
                        <td>{category.name}</td>
                        <td className="text-right">
                          <UncontrolledDropdown>
                            <DropdownToggle
                              className="btn-icon-only text-light"
                              href="#actions"
                              role="button"
                              size="sm"
                              color=""
                              onClick={(e) => e.preventDefault()}
                            >
                              <i className="fas fa-ellipsis-v" />
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-arrow" right>
                              <DropdownItem
                                to={`/categories/edit/${category.id}`}
                                tag={Link}
                              >
                                Edit
                              </DropdownItem>
                              <DropdownItem
                                onClick={() => confirmDelete(category.id)}
                              >
                                Delete
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </td>
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
