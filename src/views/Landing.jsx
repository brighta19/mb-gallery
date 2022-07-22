import { useEffect, useState, useContext } from "react";

//Components
import Post from "../component/Post";
import Loader from "../component/Loader";
import Image from "../component/Image";
import Modal from "../component/Modal";

//Styles
import "../style.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";

//Context
import { ConfigContext } from "../GlobalContext";

//Firebase Methods
import { getData } from "../function/firebaseMethods.js";

const Landing = () => {
  const Globalconfig = useContext(ConfigContext);

  //States
  const [data, setData] = useState([]);
  const [keys, setKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedKey, setSelectedKey] = useState("");
  const [modalVisibility, setModalVisibility] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    getData(Globalconfig.database, "posts/").then((retData) => {
      setData(retData);
      const k = Object.keys(retData).sort((a, b) => 0.5 - Math.random());
      setKeys(k);
      setLoading(true);

      // Selects thumbnail based on scroll position (on mobile)
      const selectThumbnail = () => {
        const thumbnails = document.querySelectorAll(".thumbnail");
        const range = [0.05, 0.4];
        const selectedThumbnail = document.querySelector(".selected");

        [...thumbnails].find((tn, index) => {
          const rect = tn.getBoundingClientRect();
          const top = rect.top;
          const isInView =
            top >= range[0] * window.innerHeight &&
            top <= range[1] * window.innerHeight;

          if (isInView) {
            if (selectedThumbnail !== tn) {
              selectedThumbnail?.classList.remove("selected");
              tn.classList.add("selected");
              setSelectedKey(k[index]);
            }
            return true;
          }
          return false;
        });
      };

      // Only selects thumbnail on mobile
      const handleSelectThumbnail = () => {
        if (window.innerWidth < 630) {
          window.addEventListener("scroll", selectThumbnail);
          selectThumbnail();
        } else {
          window.removeEventListener("scroll", selectThumbnail);
          document.querySelector(".selected")?.classList.remove("selected");
          setSelectedKey("");
        }
      };

      // In case of desktop
      window.addEventListener("resize", handleSelectThumbnail);
      handleSelectThumbnail();
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
              <Image
                key={key}
                image_url={data[key].image_url}
                caption={data[key].description}
                author={formatName(data[key].author)}
                onClick={() => {
                  setSelectedImage(data[key].image_url);
                  setModalVisibility(true);
                }}
              />
            );
          })}
        </div>
        <Modal visibility={modalVisibility}>
          <img id="modalImage" src={selectedImage} />
          <Button
            id="modalClose"
            variant="danger"
            onClick={() => setModalVisibility(false)}
          >
            Close
          </Button>
        </Modal>
        {selectedKey !== "" && (
          <div id="postDescription">
            <p>{formatName(data[selectedKey].author)}</p>
            <p>{data[selectedKey].description}</p>
          </div>
        )}
      </>
    );
  } else {
    return <Loader />;
  }
};

export default Landing;
