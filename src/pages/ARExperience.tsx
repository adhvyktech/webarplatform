import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import MarkerUpload from '../components/MarkerUpload';
import OutputUpload from '../components/OutputUpload';
import PreviewSection from '../components/PreviewSection';

const ARExperience: React.FC = () => {
  const [markerUrl, setMarkerUrl] = useState<string | null>(null);
  const [contentUrl, setContentUrl] = useState<string | null>(null);
  const [scale, setScale] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);

  const handleSave = () => {
    // In a real application, you would save the current state to a backend
    console.log('Saving AR experience:', { markerUrl, contentUrl, scale, rotation });
    alert('AR experience saved successfully!');
  };

  const handleGenerateARExperience = () => {
    const uniqueId = Math.random().toString(36).substr(2, 9);
    const arExperienceUrl = `${window.location.origin}/view/${uniqueId}`;
    
    // In a real application, you would send this data to your backend
    const arExperienceData = {
      id: uniqueId,
      markerUrl,
      contentUrl,
      scale,
      rotation
    };
    
    // Simulating storing the data in localStorage (replace with actual API call in production)
    localStorage.setItem(`arExperience_${uniqueId}`, JSON.stringify(arExperienceData));
    
    setGeneratedUrl(arExperienceUrl);
    console.log('Generated AR experience URL:', arExperienceUrl);
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
      {generatedUrl && (
        <div className="mt-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">AR Experience Generated</h2>
          <p className="mb-4">Scan this QR code to view the AR experience:</p>
          <div className="flex justify-center">
            <QRCodeSVG value={generatedUrl} size={256} />
          </div>
          <p className="mt-4">
            Or visit this URL: <a href={generatedUrl} className="text-blue-500 hover:underline">{generatedUrl}</a>
          </p>
        </div>
      )}
    </div>
  );
};

export default ARExperience;