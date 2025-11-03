import React, { useEffect, useState } from "react";
import axios from "axios";

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/posts");
      setPosts(res.data);
    } catch (err) {
      console.error("❌ Error fetching posts:", err);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h2 className="text-2xl font-semibold mb-4">Recent Posts</h2>
      {posts.length === 0 ? (
        <p className="text-gray-500">No posts yet. Add one above 👆</p>
      ) : (
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post._id} className="border-b pb-3">
              <h3 className="text-lg font-bold text-gray-800">{post.title}</h3>
              <p className="text-gray-700 mt-1">{post.content}</p>
              <p className="text-sm text-gray-500 mt-2">
                ✍️ {post.author || "Anonymous"} •{" "}
                {new Date(post.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PostList;
