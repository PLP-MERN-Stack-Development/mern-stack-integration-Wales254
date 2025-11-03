import React, { useState } from "react";
import axios from "axios";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/posts", {
        title,
        content,
        author,
      });
      alert("✅ Post created successfully!");
      setTitle("");
      setContent("");
      setAuthor("");
      window.location.reload();
    } catch (error) {
      console.error("❌ Error creating post:", error);
      alert("Failed to create post");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow p-6 space-y-4"
    >
      <h2 className="text-2xl font-semibold">Create a New Post</h2>
      <input
        type="text"
        placeholder="Title"
        className="w-full p-3 border rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Content"
        className="w-full p-3 border rounded h-32"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Author"
        className="w-full p-3 border rounded"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
      >
        Post
      </button>
    </form>
  );
};

export default CreatePost;
