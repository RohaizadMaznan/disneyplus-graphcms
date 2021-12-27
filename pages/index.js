import { gql, GraphQLClient } from "graphql-request";
import Navbar from "../components/Navbar";
import Section from "../components/Section";

export const getStaticProps = async () => {
  const url = process.env.GRAPH_CMS_ENDPOINT;
  const graphQLClient = new GraphQLClient(url, {
    headers: {
      Authorization: process.env.GRAPH_CMS_TOKEN,
    },
  });

  const query = gql`
    query {
      videos {
        id
        title
        description
        seen
        slug
        tags
        thumbnail {
          url
        }
        mp4 {
          url
        }
        createdAt
      }
    }
  `;

  const accountQuery = gql`
    query {
      account(where: { id: "ckxouhlpkg2550b419pp8b326" }) {
        username
        avatar {
          url
        }
      }
    }
  `;

  const data = await graphQLClient.request(query);
  const videos = data.videos;
  const accountData = await graphQLClient.request(accountQuery);
  const account = accountData.account;

  return {
    props: { videos, account },
  };
};

const Home = ({ videos, account }) => {
  const randomVideo = (videos) => {
    return videos[Math.floor(Math.random() * videos.length)];
  };

  const filterVideo = (videos, genre) => {
    return videos.filter((video) => video.tags.includes(genre));
  };

  const usSeenVideos = (videos) => {
    return videos.filter((video) => video.seen == false || video.seen == null);
  };

  return (
    <>
      <Navbar account={account} />
      <div className="app">
        <div className="main-video">
          <img
            src={randomVideo(videos).thumbnail.url}
            alt={randomVideo(videos).title}
          />
        </div>
        <div className="video-feed">
          <Section
            genre={"Recommended for you"}
            videos={usSeenVideos(videos)}
          />
          <Section genre={"Family"} videos={filterVideo(videos, "family")} />
          <Section genre={"Horror"} videos={filterVideo(videos, "horror")} />
          <Section genre={"Disney"} videos={filterVideo(videos, "disney")} />
        </div>
      </div>
    </>
  );
};

export default Home;
