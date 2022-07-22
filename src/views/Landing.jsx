import { useEffect, useState, useContext } from "react";

//Components
import Post from "../component/Post";
import Loader from "../component/Loader";

//Context
import { ConfigContext } from "../GlobalContext";

//Firebase Methods
import { getData } from "../function/firebaseMethods.js";

const Landing = () => {
  const Globalconfig = useContext(ConfigContext);

  const [data, setData] = useState([]);
  const [keys, setKeys] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData(Globalconfig.database, "posts/").then((retData) => {
      setData(retData);
      setKeys(Object.keys(retData));
      setLoading(true);
    });
  }, []);

  if (loading) {
    return (
      <>
        <div id="postsholder">
          {keys.map((key) => {
            return (
              <>
                <Post
                  key={key}
                  author={data[key].author}
                  caption={data[key].description}
                  image={data[key].image_url}
                />
              </>
            );
          })}
        </div>
      </>
    );
  } else {
    return <Loader />;
  }
};

export default Landing;
