import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MarkerUpload from '../components/MarkerUpload';
import OutputUpload from '../components/OutputUpload';
import PreviewSection from '../components/PreviewSection';
import TargetTracking from '../components/TargetTracking';
import GenerateARExperience from '../components/GenerateARExperience';


const ARExperience: React.FC = () => {
  const [markerUrl, setMarkerUrl] = useState<string | null>(null);
  const [contentUrl, setContentUrl] = useState<string | null>(null);
  const [scale, setScale] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleMarkerUpload = (file: File) => {
    const url = URL.createObjectURL(file);
    setMarkerUrl(url);
  };

  const handleContentUpload = (url: string) => {
    setContentUrl(url);
  };

  const handleGenerateExperience = async () => {
    console.log('Generating AR Experience');
    setTimeout(() => {
      const mockGeneratedUrl = `/view/${Date.now()}`;
      setGeneratedUrl(mockGeneratedUrl);
    }, 2000);
  };

  return (
    <div className="ar-experience-container">
      <Header />
      <main className="ar-experience-content">
        <h1 className="text-3xl font-bold mb-8">Create Your AR Experience</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <MarkerUpload onMarkerUploaded={setMarkerUrl} onUpload={handleMarkerUpload} />
          <OutputUpload onContentUploaded={handleContentUpload} />
        </div>
        {markerUrl && contentUrl && (
          <>
            <TargetTracking
              scale={scale}
              rotation={rotation}
              onScaleChange={setScale}
              onRotationChange={setRotation}
            />
            <PreviewSection
              markerUrl={markerUrl}
              contentUrl={contentUrl}
              scale={scale}
              rotation={rotation}
              onScaleChange={setScale}
              onRotationChange={setRotation}
            />
          </>
        )}
        <GenerateARExperience onGenerate={handleGenerateExperience} />
        {generatedUrl && (
          <div className="generated-url mt-8" aria-live="polite">
            <h2 className="text-2xl font-semibold mb-4">Generated AR Experience URL:</h2>
            <a 
              href={generatedUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
              aria-label="Open generated AR experience in new tab"
            >
              {generatedUrl}
            </a>
            <button 
              onClick={() => navigate(generatedUrl)} 
              className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              aria-label="View AR Experience in current tab"
            >
              View AR Experience
            </button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ARExperience;