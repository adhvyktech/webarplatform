import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import MarkerUpload from '../components/MarkerUpload';
import OutputUpload from '../components/OutputUpload';
import PreviewSection from '../components/PreviewSection';
import { supabase, signInAnonymously } from '../utils/supabaseClient';

const ARExperience: React.FC = () => {
  const [markerUrl, setMarkerUrl] = useState<string | null>(null);
  const [contentUrl, setContentUrl] = useState<string | null>(null);
  const [scale, setScale] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        await signInAnonymously();
      } catch (error) {
        console.error('Error signing in anonymously:', error);
        setError('Failed to initialize. Please refresh the page and try again.');
      }
    };

    initializeAuth();
  }, []);

  const handleGenerateARExperience = async () => {
    if (!markerUrl || !contentUrl) {
      setError('Please upload both marker and content images.');
      return;
    }

    setIsLoading(true);
    setError(null);

    const arExperienceData = { marker_url: markerUrl, content_url: contentUrl, scale, rotation };
    
    try {
      const response = await fetch('/api/save-experience', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(arExperienceData),
      });

      if (!response.ok) {
        throw new Error('Failed to save AR experience');
      }

      const data = await response.json();
      const arExperienceUrl = `${window.location.origin}/view/${data.id}`;
      setGeneratedUrl(arExperienceUrl);
      console.log('AR experience saved successfully!');
    } catch (error) {
      console.error('Error saving AR experience:', error);
      setError('Failed to save AR experience. Please try again.');
    } finally {
      setIsLoading(false);
    }
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
      <div className="mt-8 flex justify-center">
        <button
          onClick={handleGenerateARExperience}
          disabled={isLoading || !markerUrl || !contentUrl}
          className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ${
            (isLoading || !markerUrl || !contentUrl) && 'opacity-50 cursor-not-allowed'
          }`}
        >
          {isLoading ? 'Generating...' : 'Generate AR Experience'}
        </button>
      </div>
      {error && (
        <div className="mt-4 text-red-500 text-center">
          {error}
        </div>
      )}
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