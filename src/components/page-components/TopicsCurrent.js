import currentcss from "@styles/page-modules/topics.current.module.scss";
import InstagramDisplay from "@components/other-components/InstagramDisplay";

const TopicsCurrent = async ({ data }) => {
  const dataAttributes = data.data.attributes;

  // fetch data from instagram api
  const token = process.env.INSTAGRAM_TOKEN;
  const instagramURI = "https://graph.instagram.com/me/media" 
  const query = `fields=id,media_type,media_url,permalink,username,timestamp,caption,children{media_url}&access_token=${token}`
  const instagramDataFetched = await fetch(`${instagramURI}/${query}`)
  const instagramJson = await instagramDataFetched.json();

  return (
    <div className={currentcss.maincontainer}>
      <h1 className="header">{dataAttributes.title}</h1>
      <InstagramDisplay dataAttributes={dataAttributes} instagramData={instagramJson} />
    </div>
  );
};

export default TopicsCurrent;
