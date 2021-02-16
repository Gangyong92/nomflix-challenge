import styled from "styled-components";
import Message from "Components/Message";

const Container = styled.div`
  display: flex;
  padding-bottom: 30px;
`;

const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(max-content, 600px));
  gap: 20px;
`;

const VideoFrame = styled.iframe`
  padding: 0 30px;
  height: 300px;
  width: 100%;
`;

const Videos = (props) => {
  // YouTube만 필터링
  const videos = props.videos.filter((video) => video.site === "YouTube");

  return (
    <Container>
      {videos && videos.length > 0 ? (
        <Grid>
          {videos.map((video, index) => (
            <VideoFrame
              key={index}
              title={video.name}
              src={`https://www.youtube.com/embed/${video.key}`}
              allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; autoplay;"
              allowfullscreen="allowfullscreen"
            />
          ))}
        </Grid>
      ) : (
        <Message color="#e74c3c" text="Videos do not exist" />
      )}
    </Container>
  );
};

export default Videos;
