const Image = (props) => {
  const image_url = props.image_url;
  const title = props.caption;
  const author = props.author;
  return (
    <img
      id="imgGrid"
      src={image_url}
      alt={title}
      onClick={() => {
        alert(image_url + "\n\n" + title + "\n\n" + author);
      }}
    />
  );
};

export default Image;
