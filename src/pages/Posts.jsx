import { useState, useEffect } from "react";
import PostCard from "../components/PostCard";
import { supabase } from "../supabase";

function Posts() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const [editingId, setEditingId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    getCurrentUser();
    fetchPosts();
  }, []);

  async function getCurrentUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    setCurrentUser(user);
  }

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

  async function handleAddPost() {
    if (!title || !category || !content) {
      alert("Please fill all fields!");
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    let fileUrl = "";

    if (file) {
      const fileName = `${Date.now()}-${file.name}`;

      const { error: uploadError } = await supabase.storage
        .from("notes")
        .upload(fileName, file);

      if (uploadError) {
        alert(uploadError.message);
        return;
      }

      const { data } = supabase.storage
        .from("notes")
        .getPublicUrl(fileName);

      fileUrl = data.publicUrl;
    }

    const { error } = await supabase.from("posts").insert([
      {
        title,
        category,
        content,
        file_url: fileUrl,
        user_id: user.id,
      },
    ]);

    if (error) {
      alert(error.message);
      return;
    }

    setTitle("");
    setCategory("");
    setContent("");
    setFile(null);

    fetchPosts();
  }

  function handleEdit(post) {
    setTitle(post.title);
    setCategory(post.category);
    setContent(post.content);

    setEditingId(post.id);
    setIsEditing(true);
  }

  async function handleUpdatePost() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase
      .from("posts")
      .update({
        title,
        category,
        content,
      })
      .eq("id", editingId)
      .eq("user_id", user.id);

    if (error) {
      alert(error.message);
      return;
    }

    setTitle("");
    setCategory("");
    setContent("");
    setEditingId(null);
    setIsEditing(false);

    fetchPosts();
  }

  async function handleDelete(id) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase
      .from("posts")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) {
      alert(error.message);
      return;
    }

    fetchPosts();
  }

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.content.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      post.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="welcome">
      <h1>📚 Student Posts</h1>

      <div className="post-form">
        <input
          type="text"
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          <option value="DSA">DSA</option>
          <option value="DBMS">DBMS</option>
          <option value="AI">AI</option>
          <option value="React">React</option>
          <option value="DSP">DSP</option>
          <option value="Embedded">Embedded</option>
          <option value="Others">Others</option>
        </select>

        <textarea
          placeholder="Enter Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button
          onClick={
            isEditing
              ? handleUpdatePost
              : handleAddPost
          }
        >
          {isEditing ? "Update Post" : "Add Post"}
        </button>
      </div>

      <br />

      <input
        type="text"
        placeholder="🔍 Search posts..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <br />
      <br />

      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="All">All Categories</option>
        <option value="DSA">DSA</option>
        <option value="DBMS">DBMS</option>
        <option value="AI">AI</option>
        <option value="React">React</option>
        <option value="DSP">DSP</option>
        <option value="Embedded">Embedded</option>
        <option value="Others">Others</option>
      </select>

      <br />
      <br />

      {filteredPosts.length === 0 ? (
        <h3>No Posts Found.</h3>
      ) : (
        filteredPosts.map((post) => (
          <PostCard
            key={post.id}
            {...post}
            created_at={new Date(post.created_at).toLocaleString()}
            showDelete={currentUser?.id === post.user_id}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))
      )}
    </div>
  );
}

export default Posts;