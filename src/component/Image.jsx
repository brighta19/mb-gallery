const Image = (props) => {
  const image_url = props.image_url;
  const title = props.caption;
  const author = props.author;
  return (
    <div className="thumbnail">
      <img src={image_url} alt={title} onClick={props.onClick} />
    </div>
  );
};

export default Image;
