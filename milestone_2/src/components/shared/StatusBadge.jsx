import React from 'react';

export default function StatusBadge({ children, color, className = '' }) {
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${color} ${className}`}>
      {children}
    </span>
  );
} 