import React, { useState } from 'react';
import MarkerUpload from '../components/MarkerUpload';
import OutputUpload from '../components/OutputUpload';
import PreviewSection from '../components/PreviewSection';

const ARExperience: React.FC = () => {
  const [markerUrl, setMarkerUrl] = useState<string | null>(null);
  const [contentUrl, setContentUrl] = useState<string | null>(null);
  const [scale, setScale] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);

  const handleSave = () => {
    // In a real application, you would save the current state to a backend
    console.log('Saving AR experience:', { markerUrl, contentUrl, scale, rotation });
    alert('AR experience saved successfully!');
  };

  const handleGenerateARExperience = () => {
    // In a real application, you would generate a unique URL for the AR experience
    const uniqueId = Math.random().toString(36).substr(2, 9);
    const arExperienceUrl = `https://your-ar-platform.com/view/${uniqueId}`;
    console.log('Generated AR experience URL:', arExperienceUrl);
    alert(`AR experience generated! URL: ${arExperienceUrl}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Create Your AR Experience</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <MarkerUpload onMarkerUploaded={setMarkerUrl} />
        <OutputUpload onContentUploaded={setContentUrl} />
      </div>
      {markerUrl && contentUrl && (
        <PreviewSection
          markerUrl={markerUrl}
          contentUrl={contentUrl}
          scale={scale}
          rotation={rotation}
          onScaleChange={setScale}
          onRotationChange={setRotation}
        />
      )}
      <div className="mt-8 flex justify-center space-x-4">
        <button
          onClick={handleSave}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Save AR Experience
        </button>
        <button
          onClick={handleGenerateARExperience}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Generate AR Experience
        </button>
      </div>
    </div>
  );
};

export default ARExperience;