import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface OutputUploadProps {
  onContentUploaded: (url: string) => void;
}

const OutputUpload: React.FC<OutputUploadProps> = ({ onContentUploaded }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setPreviewUrl(dataUrl);
      onContentUploaded(dataUrl);
    };

    reader.readAsDataURL(file);
  }, [onContentUploaded]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [], 'video/*': [], 'model/gltf-binary': [], 'model/gltf+json': [] },
    multiple: false,
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Upload AR Content</h2>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer ${
          isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
        }`}
      >
        <input {...getInputProps()} />
        {previewUrl ? (
          <img src={previewUrl} alt="Content preview" className="max-h-48 mx-auto" />
        ) : (
          <p>{isDragActive ? 'Drop the file here' : 'Drag & drop AR content, or click to select'}</p>
        )}
      </div>
    </div>
  );
};

export default OutputUpload;