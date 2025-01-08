import React, { useState } from 'react';

const useDragAndDrop = (onFileSelect: (file: File) => void) => {
  const [isDragActive, setIsDragActive] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = () => {
    setIsDragActive(false);
  };

  const handleDragDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(false);
    const file = e.dataTransfer.files[0];
    setFile(file);
  };

  const setFile = (file: File | null) => {
    if (file && file.type.startsWith('image/')) {
      onFileSelect(file);
    }
  };

  return {
    isDragActive,
    handleDragOver,
    handleDragLeave,
    handleDragDrop,
    setFile,
  };
};

export default useDragAndDrop;