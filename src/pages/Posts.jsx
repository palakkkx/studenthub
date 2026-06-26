import { useState, useEffect } from "react";
import PostCard from "../components/PostCard";
import { supabase } from "../supabase";

function Posts() {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([]);

  // Fetch posts when page loads
  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
      return;
    }

    setPosts(data);
  }

  // Add a new post
  async function handleAddPost() {
    if (
      title.trim() === "" ||
      subject.trim() === "" ||
      content.trim() === ""
    ) {
      alert("Please fill all fields!");
      return;
    }

    const { error } = await supabase
      .from("posts")
      .insert([
        {
          title,
          subject,
          content,
        },
      ]);

    if (error) {
      console.log(error);
      alert("Failed to add post!");
      return;
    }

    // Reload posts
    fetchPosts();

    // Clear form
    setTitle("");
    setSubject("");
    setContent("");
  }

  // Delete a post
  async function handleDelete(id) {
    const { error } = await supabase
      .from("posts")
      .delete()
      .eq("id", id);

    if (error) {
      console.log(error);
      alert("Failed to delete post!");
      return;
    }

    fetchPosts();
  }

  return (
    <div className="welcome">
      <h1>Posts 📚</h1>

      <div className="post-form">
        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        <textarea
          placeholder="Enter content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button onClick={handleAddPost}>
          Add Post
        </button>
      </div>

      {posts.map((post) => (
        <PostCard
          key={post.id}
          id={post.id}
          title={post.title}
          subject={post.subject}
          content={post.content}
          created_at={new Date(post.created_at).toLocaleString()}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}

export default Posts;