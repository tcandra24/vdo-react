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

import { Link } from "react-router-dom";
// core components
import Header from "components/Headers/Header";
import AdminLayout from "layouts/Admin";
import { useState, useEffect } from "react";

import cookies from "js-cookie";
import api from "services/api";

const Index = () => {
  const [videos, setVideos] = useState([]);

  const fetchVideos = async () => {
    try {
      const token = cookies.get("token");

      if (!token) return new Error("Token Not Found");

      api.defaults.headers.common["Authorization"] = token;

      const { data } = await api.get("/api/videos");

      if (!data.success) {
        throw new Error(data.message);
      }

      setVideos(data.videos);
    } catch (error) {
      console.log("Error Found ", error.message);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const deleteVideo = async (id) => {
    try {
      const token = cookies.get("token");

      if (!token) return new Error("Token Not Found");

      api.defaults.headers.common["Authorization"] = token;

      const { data } = await api.delete(`/api/videos/${id}`);

      if (!data.success) {
        throw new Error(data.message);
      }

      fetchVideos();
    } catch (error) {
      console.log("Error Found ", error.message);
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
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Link</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {videos && videos.length > 0 ? (
                    videos.map((video, index) => (
                      <tr key={index}>
                        <td>{video.name}</td>
                        <td>{video.link}</td>
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
                                to={`/videos/edit/${video.id}`}
                                tag={Link}
                              >
                                Edit
                              </DropdownItem>
                              <DropdownItem
                                onClick={() => deleteVideo(video.id)}
                              >
                                Delete
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3">
                        <Alert
                          className="text-center font-weight-bold"
                          color="info"
                        >
                          Videos is Empty
                        </Alert>
                      </td>
                    </tr>
                  )}
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
