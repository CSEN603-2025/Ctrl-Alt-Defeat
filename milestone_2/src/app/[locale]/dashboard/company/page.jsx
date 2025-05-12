"use client"

import { useState } from 'react';
import CompanyCreatePost from '@/components/CompanyCreatePost';
import PostTiles from '@/components/PostTiles';
import TileEdit from '@/components/TileEdit';
import DeleteTileConfirmation from '@/components/DeleteTileConfirmation';
import Header from '@/components/Header';

export default function CompanyDashboard() {
  const [posts, setPosts] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const handleAddPost = (newPost) => {
    setPosts((prev) => [...prev, newPost]);
  };

  const handleUpdatePost = (updatedPost) => {
    setPosts((prev) =>
      prev.map((post, i) => (i === editIndex ? updatedPost : post))
    );
    setEditIndex(null);
  };

  const handleDeletePost = () => {
    setPosts((prev) => prev.filter((_, i) => i !== deleteIndex));
    setDeleteIndex(null);
  };

  return (
    <div className="p-6">
      <Header text="Company Dashboard" size="text-6xl"></Header>
      <CompanyCreatePost onAddPost={handleAddPost} />
      <h1>Your Job Postings:</h1>
      <PostTiles
        posts={posts}
        onEditClick={(index) => setEditIndex(index)}
        onDeleteClick={(index) => setDeleteIndex(index)}
      />
      {editIndex !== null && (
        <TileEdit
          post={posts[editIndex]}
          onSave={handleUpdatePost}
          onCancel={() => setEditIndex(null)}
        />
      )}
      {deleteIndex !== null && (
        <DeleteTileConfirmation
          type="post"
          onConfirm={handleDeletePost}
          onCancel={() => setDeleteIndex(null)}
        />
      )}
    </div>
  );
}