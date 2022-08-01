import { useEffect, useState, useContext } from "react";
import { isMobile } from "react-device-detect";
import { Palette } from "react-palette";

// Components
import Post from "../component/Post";
import Loader from "../component/Loader";
import Image from "../component/Image";
import Modal from "../component/Modal";

// Styles
import "../style.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";

// Icons
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";

// Assets
import ProfileImg from "../assets/metabronx.jpeg";

// Context
import { ConfigContext } from "../GlobalContext";

// Firebase Methods
import { getData } from "../function/firebaseMethods.js";

const Landing = () => {
  const Globalconfig = useContext(ConfigContext);

  // States
  const [FirebaseData, setFirebaseData] = useState([]);
  const [keys, setKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedKey, setSelectedKey] = useState("");

  // Modal States
  const [modalVisibility, setModalVisibility] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [selectedDescription, setSelectedDescription] = useState("");
  const [selectedKeyArr, setSelectedKeyArr] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [modalLoaderVisibility, setModalLoaderVisibility] = useState(true);
  // const [colorPalette, setColorPalette] = useState({});

  useEffect(() => {
    getData(Globalconfig.database, "posts/").then((retData) => {
      setFirebaseData(retData);
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
        <div className="information mt-4 mb-4">
          <img key='1' src={ProfileImg} alt="Profile" />
          <h3 className="mt-2">MetaBronx</h3>
          <p>All the artworks are made by 2022 summer cohort participants</p>
          <div className="social mt-2">
            <a href='https://www.metabronx.com/' rel="noreferrer" target='_blank'>Website</a> 
            <a href='mailto:metabronx@gmail.com?Subject:hello' rel="noreferrer" target='_blank'>Contact</a>
          </div>
        </div>
        <hr></hr>

        <div id="imgGridHolder">
          {keys.map((key) => {
            return (
              <Image
                key={key}
                image_url={FirebaseData[key].image_url}
                caption={FirebaseData[key].description}
                author={formatName(FirebaseData[key].author)}
                onClick={() => {
                  if (isMobile === false) {
                    setSelectedImage(FirebaseData[key].image_url);
                    setModalVisibility(true);
                    setSelectedAuthor(formatName(FirebaseData[key].author));
                    setSelectedKeyArr(key);
                    setSelectedIndex(keys.indexOf(key));
                  }
                }}
              />
            );
          })}
        </div>

        <Palette src={selectedImage}>
          {({ data, loading, error }) => (
            <Modal
              visibility={modalVisibility}
              bgColor1={data.lightMuted}
              bgColor2={data.lightVibrant}
            >
              <Loader visibility={modalLoaderVisibility} />
              <img
                style={{
                  display: modalLoaderVisibility === false ? "" : "none",
                }}
                id="modalImage"
                src={selectedImage}
                onLoad={() => {
                  setModalLoaderVisibility(false);
                }}
              />
              <h5 className="author mt-3">By {selectedAuthor}</h5>
              <h5 className="author">Artist Statement: {selectedDescription}</h5>
              <Button
                id="modalClose"
                variant="danger"
                onClick={() => setModalVisibility(false)}
              >
                Close
              </Button>

              {/* Next and Previous buttons */}
              <Button
                id="nextImage"
                onClick={() => {
                  if (selectedIndex < keys.length - 1) {
                    setSelectedIndex(selectedIndex + 1);
                    setSelectedImage(
                      FirebaseData[keys[selectedIndex + 1]].image_url
                    );
                    setSelectedAuthor(
                      formatName(FirebaseData[keys[selectedIndex + 1]].author)
                    );
                    setSelectedDescription(
                      formatName(FirebaseData[keys[selectedIndex + 1]].description)
                    );
                  }
                }}
              >
                <GrNext />
              </Button>
              <Button
                id="prevImage"
                onClick={() => {
                  if (selectedIndex > 0) {
                    setSelectedIndex(selectedIndex - 1);
                    setSelectedImage(
                      FirebaseData[keys[selectedIndex - 1]].image_url
                    );
                    setSelectedAuthor(
                      formatName(FirebaseData[keys[selectedIndex - 1]].author),
                    );
                    setSelectedDescription(
                      formatName(FirebaseData[keys[selectedIndex + 1]].description)
                    );
                  }
                }}
              >
                <GrPrevious />
              </Button>
            </Modal>
          )}
        </Palette>

        {selectedKey !== "" && (
          <div id="postDescription">
            <p>{formatName(FirebaseData[selectedKey].author)}</p>
            <p>{FirebaseData[selectedKey].description}</p>
          </div>
        )}
        <p className="footer mb-5">All materials © 2022-Present, their respective owners or MetaBronx Inc.</p>
      </>
    );
  } else {
    return <Loader />;
  }
};

export default Landing;
