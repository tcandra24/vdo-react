import {
  Alert,
  Card,
  CardGroup,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
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
  Col,
  Button,
  Badge,
} from "reactstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { Link } from "react-router-dom";
// core components
import Header from "../../../components/Headers/Header";
import AdminLayout from "../../../layouts/Admin";
import { useEffect, useReducer } from "react";

import { toast } from "react-toastify";

import { videoReducer, INITIAL_STATE } from "../../../reducers/videoReducer";

import cookies from "js-cookie";
import api from "../../../services/api";

import { AuthContext } from "../../../context/Auth";
import { useContext } from "react";

const Index = () => {
  const [state, dispatch] = useReducer(videoReducer, INITIAL_STATE);
  const { fetchDataDashboard } = useContext(AuthContext);

  const fetchVideos = async () => {
    dispatch({ type: "FETCH_VIDEOS" });

    try {
      const token = cookies.get("token");

      if (!token) return new Error("Token Not Found");

      api.defaults.headers.common["Authorization"] = token;

      const { data } = await api.get("/api/videos");

      if (!data.success) {
        throw new Error(data.message);
      }

      dispatch({ type: "FETCH_VIDEOS_SUCCESS", payload: data.videos });
    } catch (error) {
      dispatch({ type: "FETCH_VIDEOS_FAILURE", payload: error.message });
    }
  };

  useEffect(() => {
    fetchVideos();
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
          deleteVideo(id);
        }
      });
  };

  const deleteVideo = async (id) => {
    dispatch({ type: "DELETE_VIDEOS" });

    try {
      const token = cookies.get("token");

      if (!token) return new Error("Token Not Found");

      api.defaults.headers.common["Authorization"] = token;

      const { data } = await api.delete(`/api/videos/${id}`);

      if (!data.success) {
        throw new Error(data.message);
      }

      toast.success(data.message);

      dispatch({ type: "DELETE_VIDEOS_SUCCESS" });

      fetchVideos();
      fetchDataDashboard();
    } catch (error) {
      dispatch({ type: "DELETE_VIDEOS_FAILURE", payload: error.message });
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
              <div className="m-3">
                <Link to="/videos/create">
                  <Button color="primary">Add Video</Button>
                </Link>
              </div>
              {state.loading && (
                <Row className="m-3">
                  <Col>
                    <Alert
                      className="text-center font-weight-bold"
                      color="info"
                    >
                      Loading
                    </Alert>
                  </Col>
                </Row>
              )}

              {state.videos && !state.loading && state.videos.length === 0 && (
                <Row className="m-3">
                  <Col>
                    <Alert
                      className="text-center font-weight-bold"
                      color="info"
                    >
                      Videos is Empty
                    </Alert>
                  </Col>
                </Row>
              )}

              <Row className="m-3">
                {!state.loading &&
                  state.videos.length > 0 &&
                  state.videos.map((video, index) => (
                    <Col sm="4" xs="6" key={index}>
                      <Card className="mx-1">
                        <Link to={`/videos/show/${video.id}`}>
                          <CardImg
                            alt="Card image cap"
                            src={`https://img.youtube.com/vi/${video.video_id}/mqdefault.jpg`}
                            top
                            width="100%"
                          />
                        </Link>
                        <CardBody>
                          <CardTitle tag="h5">{video.name}</CardTitle>
                          <CardSubtitle className="mb-2 text-muted" tag="h6">
                            <Badge color="primary" pill>
                              {video.category.name}
                            </Badge>
                          </CardSubtitle>

                          <Row className="justify-content-end">
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
                              <DropdownMenu
                                className="dropdown-menu-arrow"
                                right
                              >
                                <DropdownItem
                                  to={`/videos/show/${video.id}`}
                                  tag={Link}
                                >
                                  Show
                                </DropdownItem>
                                <DropdownItem
                                  to={`/videos/edit/${video.id}`}
                                  tag={Link}
                                >
                                  Edit
                                </DropdownItem>
                                <DropdownItem
                                  onClick={() => confirmDelete(video.id)}
                                >
                                  Delete
                                </DropdownItem>
                              </DropdownMenu>
                            </UncontrolledDropdown>
                          </Row>
                        </CardBody>
                      </Card>
                    </Col>
                  ))}
              </Row>

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
