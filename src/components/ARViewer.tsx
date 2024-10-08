import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import MarkerUpload from '../components/MarkerUpload';
import OutputUpload from '../components/OutputUpload';
import PreviewSection from '../components/PreviewSection';

const ARViewer: React.FC = () => {
  const [markerUrl, setMarkerUrl] = useState<string | null>(null);
  const [contentUrl, setContentUrl] = useState<string | null>(null);
  const [scale, setScale] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);

  const handleMarkerUpload = (file: File) => {
    const url = URL.createObjectURL(file);
    setMarkerUrl(url);
  };

  const handleContentUpload = (url: string) => {
    setContentUrl(url);
  };

  const handleSave = async () => {
    const arExperienceData = { markerUrl, contentUrl, scale, rotation };
    try {
      const response = await fetch('/.netlify/functions/arExperience', {
        method: 'POST',
        body: JSON.stringify(arExperienceData),
      });
      const { id } = await response.json();
      const arExperienceUrl = `${window.location.origin}/view/${id}`;
      setGeneratedUrl(arExperienceUrl);
      console.log('AR experience saved successfully!');
    } catch (error) {
      console.error('Error saving AR experience:', error);
      alert('Failed to save AR experience. Please try again.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Create Your AR Experience</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <MarkerUpload onMarkerUploaded={setMarkerUrl} onUpload={handleMarkerUpload} />
        <OutputUpload onContentUploaded={handleContentUpload} />
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

export default ARViewer;