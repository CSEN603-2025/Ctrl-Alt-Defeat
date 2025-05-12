'use client';

import React, { useState } from 'react';
import UploadDocuments from '@/components/UploadDocuments';

export default function UploadPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Document Upload Page</h1>
      <button
        onClick={handleOpenModal}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          color: 'white',
          backgroundColor: '#318FA8',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginTop: '20px'
        }}
      >
        Upload Documents
      </button>
      <UploadDocuments open={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}