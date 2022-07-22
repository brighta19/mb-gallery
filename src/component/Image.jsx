const Image = (props) => {
  const image_url = props.image_url;
  const title = props.caption;
  const author = props.author;
  return (
    <>
      <div id="imgGrid">
        <img
          class="thumbnail"
          src={image_url}
          alt={title}
          onClick={() => {
            alert(image_url + "\n\n" + title + "\n\n" + author);
          }}
        />
      </div>
    </>
  );
};

export default Image;
