import { Container, Row, Col, Alert, Card } from "reactstrap";

import cookies from "js-cookie";

import AdminLayout from "../../../layouts/Admin";

import Header from "../../../components/Headers/Header";

const Index = () => {
  const user = JSON.parse(cookies.get("user"));

  return (
    <>
      <AdminLayout>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Col className="mb-5 mb-xl-0" xl="12">
              <Card className="shadow p-5">
                <Alert className="text-center font-weight-bold" color="info">
                  Welcome {user.name}
                </Alert>
              </Card>
            </Col>
          </Row>
        </Container>
      </AdminLayout>
    </>
  );
};

export default Index;
