import { Card, CardHeader, Container, Row } from "reactstrap";

import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

import Header from "components/Headers/Header";
import AdminLayout from "layouts/Admin";
import { useReducer, useEffect } from "react";

import { toast } from "react-toastify";

import cookies from "js-cookie";

import { videoReducer, INITIAL_STATE } from "reducers/videoReducer";

import api from "services/api";
import { useParams } from "react-router-dom";

const Show = () => {
  // const [video, setVideo] = useState({});
  const [state, dispatch] = useReducer(videoReducer, INITIAL_STATE);

  const { id } = useParams();
  const token = cookies.get("token");

  const fetchVideo = async () => {
    dispatch({ type: "GET_VIDEO" });

    try {
      api.defaults.headers.common["Authorization"] = token;
      const { data } = await api.get(`/api/videos/${id}`);

      // setVideo(data.data);
      dispatch({ type: "GET_VIDEO_SUCCESS", payload: data.data });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchVideo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                <h3 className="mb-0">Videos</h3>
                <p>{state.video.name}</p>
              </CardHeader>
              <div className="m-3">
                <LiteYouTubeEmbed
                  playlist={false}
                  poster="maxresdefault"
                  id={state.video.video_id}
                  title={state.video.name}
                />
              </div>
            </Card>
          </div>
        </Row>
      </Container>
    </AdminLayout>
  );
};

export default Show;
