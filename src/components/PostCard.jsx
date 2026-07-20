function PostCard(props) {
  return (
    <div className="post-card">
      <h2>{props.title}</h2>

      <p className="category">
        <strong>Category:</strong> {props.category}
      </p>

      <p>{props.content}</p>

      {props.file_url && (
        <p>
          📄{" "}
          <a
            href={props.file_url}
            target="_blank"
            rel="noreferrer"
          >
            View PDF
          </a>
        </p>
      )}

      <p className="post-date">
        Posted on: {props.created_at}
      </p>

      {props.showDelete && (
        <>
          <button
            className="edit-btn"
            onClick={() => props.onEdit(props)}
          >
            ✏️ Edit
          </button>

          <button
            className="delete-btn"
            onClick={() => props.onDelete(props.id)}
          >
            🗑 Delete
          </button>
        </>
      )}
    </div>
  );
}

export default PostCard;