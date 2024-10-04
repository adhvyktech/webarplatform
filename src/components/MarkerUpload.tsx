import React, { useState, useCallback, Dispatch, SetStateAction } from 'react';
import { useDropzone } from 'react-dropzone';

interface MarkerUploadProps {
  onMarkerUploaded: Dispatch<SetStateAction<string | null>>;
  onUpload: (file: File) => void;
}

const MarkerUpload: React.FC<MarkerUploadProps> = ({ onMarkerUploaded, onUpload }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setPreviewUrl(dataUrl);
      onMarkerUploaded(dataUrl);
      onUpload(file);
    };

    reader.readAsDataURL(file);
  }, [onMarkerUploaded, onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: false,
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Upload Marker Image</h2>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer ${
          isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
        }`}
      >
        <input {...getInputProps()} />
        {previewUrl ? (
          <img src={previewUrl} alt="Marker preview" className="max-h-48 mx-auto" />
        ) : (
          <p>{isDragActive ? 'Drop the file here' : 'Drag & drop a marker image, or click to select'}</p>
        )}
      </div>
    </div>
  );
};

export default MarkerUpload;