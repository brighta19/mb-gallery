import { useEffect, useState, useContext } from "react";

//Components
import Post from "../component/Post";
import Loader from "../component/Loader";
import Image from "../component/Image";

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
      setKeys(Object.keys(retData).sort((a, b) => 0.5 - Math.random()));
      setLoading(true);
    });
  }, []);

  //Format a name to be capitalized first letter and lowercase the rest for each word <= Github copilot did that
  const formatName = (name) => {
    const nameArray = name.split(" ");
    const newName = nameArray
      .map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(" ");
    return newName;
  };

  if (loading) {
    return (
      <>
        <div id="imgGridHolder">
          {keys.map((key) => {
            return (
              <>
                <Image
                  image_url={data[key].image_url}
                  caption={data[key].description}
                  author={formatName(data[key].author)}
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
