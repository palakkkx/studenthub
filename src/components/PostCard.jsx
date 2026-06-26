function PostCard(props) {
  return (
    <div className="post-card">
      <h2>{props.title}</h2>

      <h4>{props.subject}</h4>

      <p>{props.content}</p>

      <p className="post-date">
        Posted on: {props.created_at}
      </p>

      <button
        className="delete-btn"
        onClick={() => props.onDelete(props.id)}
      >
        Delete
      </button>
    </div>
  );
}

export default PostCard;